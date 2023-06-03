import React, { useState, createContext } from 'react'
import Geolocation from '@react-native-community/geolocation';

const AppContext = createContext(null);

const AppContentApi = ({ children }) => {
    const [notification, setNotification] = useState(null);
    const [location, setLocation] = useState(null);
    const [storage, setStorage] = useState(null);
    const [isGPSEnabled, setIsGPSEnabled] = useState(false);
    const [userCurrentLocation, setUserCurrentLocation] = useState({})

    const getUserCurrentLocation = async () => {
        Geolocation.getCurrentPosition(
            (info) => {
              let latitude = info.coords.latitude;
              let longitude = info.coords.longitude;
              console.log("Latitude", info.coords.latitude)
              console.log("Longitude", info.coords.longitude)
              setUserCurrentLocation({ latitude: latitude, longitude: longitude });
            },
            (error) => {
              console.log("geolocation", error);
            },
            { enableHighAccuracy: true }
          );
    }


    const value = {
        notification,
        location,
        storage,
        setNotification,
        setLocation,
        setStorage,
        isGPSEnabled, 
        setIsGPSEnabled,
        userCurrentLocation,
        getUserCurrentLocation
    }
    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContentApi, AppContext }