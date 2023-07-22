import React, { useState, createContext, useContext } from 'react'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { auth } from '../database/DB';
import { API_KEY } from '../constants/Const';
import { AuthContext } from './AuthContentApi';
import { users } from '../database/Collections';
import {
  bloodrequests,
  bloodtypes,
  urgentbloodrequests,
  messages_collection,
  chats
} from '../database/Collections';
import { sendNotificationToSingleDevice } from './PermissionsApi';
const AppContext = createContext(null);

const AppContentApi = ({ children }) => {

  const {
    updateProfile,
    user,
    getUserById,
    setIsLoading,
    isLoading,
  } = useContext(AuthContext);
  const [userCurrentLocation, setUserCurrentLocation] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [availableDonors, setAvailableDonors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestLocation, setRequestLocation] = useState(null);
  const [requesters, setRequesters] = useState([]);
  const [urgentRequesters, setUrgentRequesters] = useState([]);
  const [universalGroup, setUniversalGroup] = useState(null);
  const [showToast, setShowToast] = useState(false);
  Geocoder.init(API_KEY, { language: "en" });

  const getUserCurrentLocation = () => {
    getBloodUniversal();
    Geolocation.getCurrentPosition(
      async position => {
        setUserCurrentLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        await getFormattedAddress(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.error('Error getting user location:', error);
      },
      { enableHighAccuracy: true, timeout: 25000, maximumAge: 20000 },
    );
  }

  const getFormattedAddress = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const result = response.results[0];
      for (let i = 0; i < result.address_components.length; i++) {
        const component = result.address_components[i];
        if (component.types.includes('locality')) {
          setCity(component.long_name);
        }
        if (component.types.includes('country')) {
          setCountry(component.long_name);
        }
      }
      setFormattedAddress(result.formatted_address);
    } catch (error) {
      console.log("Geocode", error);
    }
  };



  const getGeometryAddress = async (address) => {
    try {

      const data = await Geocoder.from(address);
      if (data.results[0].geometry.location) {
        const new_location = {
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
        }
        await updateProfile("Address", 'address', address);
        await updateProfile(null, "city", city);
        await updateProfile(null, "country", country);
        await updateProfile("Address", 'location', new_location);

      }
    } catch (error) {
      console.log("Geocode Reverse", error);
    }

  }

  const getRequestGeometryAddress = async (address) => {
    try {

      const data = await Geocoder.from(address);
      if (data.results[0].geometry.location) {
        const new_location = {
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
        }
        return new_location;

      }
    } catch (error) {
      console.log("Geocode Reverse", error);
    }
  }

  const toggleStatus = async (status) => {
    await updateProfile('Status', 'status', status);
  }

  const isDocExist = async (collection, doc_id) => {
    const documentSnapshot = await collection.doc(doc_id).get();
    return documentSnapshot.exists;
  };

  const getBloodUniversal = () => {
    bloodtypes.doc(user.bloodgroup)
      .onSnapshot(documentSnapshot => {
        setUniversalGroup(documentSnapshot.data());
      });
  }


  const getAvailableDonor = async () => {
    getBloodUniversal();
    if (universalGroup != null) {
      try {
        const donors = await users
          .where('status', '==', 1)
          .where('bloodgroup', 'in', universalGroup.receive_from)
          .get();
        if (donors.size > 0) {
          const donorsarray = [];
          donors.forEach(doc => {
            donorsarray.push(doc.data());
          });
          setAvailableDonors(donorsarray);
        }
        else {
          setAvailableDonors([]);
        }

      } catch (error) {
        console.log("Get Donors Error", error)
      }
    }

  }



  const makeBloodRequest = (data) => {
    const uploaded_data = {
      id: auth().currentUser.uid,
      ...data,
      sender_address: formattedAddress,
      sender_city: city,
      requestStatus: 1,
    }
    setIsLoading(true);
    bloodrequests.add(uploaded_data)
      .then(async () => {
        setIsLoading(false);
        setRequestLocation(null);
        setShowToast(true);
        if(data.donor_id != ''){
          const get_user = await getUserById(data.donor_id);
          if(get_user){
            const notification = {
              title:"Blood Request",
              body: `${user.name} sent you a request for blood`,
            }
            sendNotificationToSingleDevice(notification, {screen:'ManageRequestsScreen'},  get_user.token);
          } 
        
        }
      })
      .catch(() => {
        console.log("Blood Request adding error : ", error)
      });

  }

  const makeUrgentBloodRequest = (data) => {
    const uploaded_data = {
      id: auth().currentUser.uid,
      ...data,
      sender_address: formattedAddress,
      sender_city: city,
      requestStatus: 1,
    }
    setIsLoading(true);
    urgentbloodrequests.add(uploaded_data)
      .then(() => {
        setIsLoading(false);
        setRequestLocation(null);
        setShowToast(true);
      })
      .catch(() => {
        console.log("Blood Request adding error : ", error)
      });

  }

  const getRequesters = async () => {
    try {
      const requester = await bloodrequests
        .where('id', '!=', user.id)
        .where('donor_id', '==', "")
        .get();
      if (requester.size > 0) {
        const requesterArray = [];
        requester.forEach(doc => {
          requesterArray.push(doc.data());
        });
        setRequesters(requesterArray);
      }
      else {
        setRequesters([]);
      }

    } catch (error) {
      console.log("Get Requesters Error Error", error)
    }
  }

  const getUrgentRequesters = async () => {
    try {
      const requester = await urgentbloodrequests
        .where('id', '!=', user.id)
        .get();
      if (requester.size > 0) {
        const requesterArray = [];
        requester.forEach(doc => {
          requesterArray.push(doc.data());
        });
        setUrgentRequesters(requesterArray);
      }
      else {
        setUrgentRequesters([]);
      }

    } catch (error) {
      console.log("Get Urgent Requester Error", error);
    }


  }



  const sendMessage = (message) => {
    messages_collection.doc(message._id)
      .set({
        ...message
      })
      .then(async () => {
        console.log('Message added!');
        let doc = null;
        const doc_id = message.sender_id.trim() + "_" + message.receiver_id.trim();
        const rev_doc_id = message.receiver_id.trim() + "_" + message.sender_id.trim();
        const document = await isDocExist(chats, doc_id);
        const rev_document = await isDocExist(chats, rev_doc_id);
        if (document) {
          doc = chats.doc(doc_id);
        }
        else if (rev_document) {
          doc = chats.doc(rev_doc_id);
        }
        else {
          chats.doc(doc_id).set({
            sender_id: message.sender_id,
            receiver_id: message.receiver_id,
            last_message: message.text,
            createdAt: message.createdAt
          }).then(() => {
            console.log("Chat Head Created");
          }).catch((err) => console.log(err));
        }

        if (doc != null) {

          doc.update({
            last_message: message.text,
            createdAt: message.createdAt
          })
            .then(() => {
              console.log('Chat Head updated!');
            }).catch((err) => console.log(err));
        }

      })
      .catch(err => console.log(err));

  }






  const value = {
    getUserCurrentLocation,
    getFormattedAddress,
    getGeometryAddress,
    toggleStatus,
    getAvailableDonor,
    userCurrentLocation,
    availableDonors,
    formattedAddress,
    city,
    country,
    user,
    modalVisible,
    setModalVisible,
    makeBloodRequest,
    requestLocation,
    getRequestGeometryAddress,
    requesters,
    urgentRequesters,
    getRequesters,
    isLoading,
    makeUrgentBloodRequest,
    showToast,
    urgentRequesters,
    getUrgentRequesters,
    sendMessage,


  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContentApi, AppContext }