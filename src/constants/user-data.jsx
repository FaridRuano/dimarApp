import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  const updateUser = (userData) => {
    setUserData(userData)
    localStorage.clear()
    localStorage.setItem('DMRPPSRDT', JSON.stringify(userData))       
  }  
  
  useEffect(()=>{
    const savedData = JSON.parse(localStorage.getItem('DMRPPSRDT'))
    if(savedData){
      updateUser(savedData)
    }else{
      updateUser(null)
    }    

  },[])
  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };