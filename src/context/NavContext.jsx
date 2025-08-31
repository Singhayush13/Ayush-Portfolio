import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Contexts
export const NavbarContext = createContext();
export const NavbarColorContext = createContext();

const NavContext = ({ children }) => {
  const [navColor, setNavColor] = useState("white");
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Define routes where navbar should be black
    const darkRoutes = ["/projects", "/about"];
    if (darkRoutes.includes(location.pathname)) {
      setNavColor("black");
    } else {
      setNavColor("white");
    }
  }, [location]);

  return (
    <NavbarContext.Provider value={[navOpen, setNavOpen]}>
      <NavbarColorContext.Provider value={[navColor, setNavColor]}>
        {children}
      </NavbarColorContext.Provider>
    </NavbarContext.Provider>
  );
};

export default NavContext;
