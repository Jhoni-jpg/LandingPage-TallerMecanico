import React, { createContext, useContext, useState } from 'react';


const ServicesContext = createContext();


export const PartsProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState('todas');
    const [searchTerm, setSearchTerm] = useState('');


    return (
        <ServicesContext.Provider value={{
            searchTerm,
            setSearchTerm,
            selectedCategory,
            setSelectedCategory,
        }}>
            {children}
        </ServicesContext.Provider>
    );
};


export const useParts = () => useContext(ServicesContext);