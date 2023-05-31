import React, { useState, createContext } from 'react'

const AppContext = createContext(null);

const AppContentApi = ({ children }) => {

    const value = {

    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContentApi, AppContext }