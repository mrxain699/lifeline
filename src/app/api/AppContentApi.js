import React, { useState, createContext, useContext } from 'react'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { bloodrequests, bloodtypes } from '../database/Collections';
import { auth } from '../database/DB';
import { API_KEY } from '../constants/Const';
import { AuthContext } from './AuthContentApi';
import { users } from '../database/Collections';
const AppContext = createContext(null);

const AppContentApi = ({ children }) => {

  const {
    updateProfile,
    user,
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
  const [universalGroup, setUniversalGroup] = useState(null);

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
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
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

  const getBloodUniversal = () => {
    bloodtypes.doc(user.bloodgroup)
      .onSnapshot(documentSnapshot => {
        setUniversalGroup(documentSnapshot.data());
      });
  }


  const getAvailableDonor = async () => {
    getBloodUniversal();
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

  

  const makeBloodRequest = (data) => {
    const uploaded_data = {
      sender_id: auth().currentUser.uid,
      ...data,
      sender_address: formattedAddress,
      sender_city: city,
      requestStatus: 0,
    }
    setIsLoading(true);
    bloodrequests.add(uploaded_data)
      .then(() => {
        setIsLoading(false);
        setRequestLocation(null);
      })
      .catch(() => {
        console.log("Blood Request adding error : ", error)
      });



  }

  const getRequesters = async () => {
    try {
      const requester = await bloodrequests
        .where('sender_id', '!=', auth().currentUser.uid)
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
      console.log("Get Donors Error", error)
    }
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
    getRequesters,
    isLoading,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContentApi, AppContext }