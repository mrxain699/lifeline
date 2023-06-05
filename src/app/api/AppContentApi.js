import React, { useState, createContext, useContext } from 'react'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { API_KEY } from '../constants/Const';
import { AuthContext } from './AuthContentApi';
import { users } from '../database/Collections';
const AppContext = createContext(null);

const AppContentApi = ({ children }) => {

  const { updateProfile, user } = useContext(AuthContext);
  const [userCurrentLocation, setUserCurrentLocation] = useState({});
  const [formattedAddress, setFormattedAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [availableDonors, setAvailableDonors] = useState([]);
  
  Geocoder.init(API_KEY, { language: "en" });

  const getUserCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        setUserCurrentLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        getFormattedAddress(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.log("geolocation", error);
      },
      { enableHighAccuracy: true }
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
        await updateProfile("City", "city", city);
        await updateProfile("Country", "country", country);
        await updateProfile("Location", 'location', new_location);

      }
    } catch (error) {
      console.log("Geocode Reverse", error);
    }

  }

  const toggleStatus = async (status) => {
    await updateProfile('Status', 'status', status);
  }

  const getAvailableDonor = async () => {
    try {
      const donors = await users.where('status', '==', 1).get();
      if (donors.size > 0) {
        const donorsarray = [];
        donors.forEach(doc => {
          donorsarray.push(doc.data());
        });
        setAvailableDonors(donorsarray);
      }
      else{
        setAvailableDonors([]);
      }

    } catch (error) {
      console.log("Get Donors Error", error)
    }
  }

  



  const value = {
    getUserCurrentLocation,
    getGeometryAddress,
    toggleStatus,
    getAvailableDonor,
    userCurrentLocation,
    availableDonors,
    formattedAddress,
    city,
    country,
    user
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContentApi, AppContext }