import React, { useState, createContext } from 'react'

const AppContext = createContext(null);

const AppContentApi = ({ children }) => {
    const [notification, setNotification] = useState(null);
    const [location, setLocation] = useState(null);
    const [storage, setStorage] = useState(null);
    const value = {
        notification,
        location,
        storage,
        setNotification,
        setLocation,
        setStorage,
    }
    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContentApi, AppContext }