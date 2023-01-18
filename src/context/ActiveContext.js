import { createContext, useContext, useState } from "react";

const ActiveContext = createContext({});

export const useActiveValue = () => useContext(ActiveContext);

const ActiveProvider = ({ children }) => {
  const [active, seActive] = useState("#home");
  return (
    <ActiveContext.Provider value={{ active, seActive }}>
      {children}
    </ActiveContext.Provider>
  );
};

export default ActiveProvider;
