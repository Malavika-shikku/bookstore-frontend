import React, { createContext, useState } from 'react';

// Create contexts
export const searchKeyContext = createContext("");
export const adminProfileUpdateContext = createContext("");
export const userProfileUpdateContext = createContext({});

const ContextSearch = ({ children }) => {
  const [searchKey, setSearchKey] = useState("");
  const [adminProfileUpdateStatus, setAdminProfileUpdateStatus] = useState({});
  const [userProfileUpdateStatus, setUserProfileUpdateStatus] = useState(
    JSON.parse(sessionStorage.getItem("existingUser")) || {}
  ); // load user from sessionStorage if available

  return (
    <userProfileUpdateContext.Provider value={{ userProfileUpdateStatus, setUserProfileUpdateStatus }}>
      <adminProfileUpdateContext.Provider value={{ adminProfileUpdateStatus, setAdminProfileUpdateStatus }}>
        <searchKeyContext.Provider value={{ searchKey, setSearchKey }}>
          {children}
        </searchKeyContext.Provider>
      </adminProfileUpdateContext.Provider>
    </userProfileUpdateContext.Provider>
  );
};

export default ContextSearch;
