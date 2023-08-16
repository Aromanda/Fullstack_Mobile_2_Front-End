import React, { createContext, useState, useContext } from 'react'; // Import useContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useUserContext = () => {
  return useContext(UserContext);
};
