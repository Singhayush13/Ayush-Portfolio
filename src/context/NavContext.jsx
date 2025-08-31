import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const NavbarContext = createContext();
export const NavbarColorContext = createContext();

const NavContext = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [navColor, setNavColor] = useState("white");
  const location = useLocation();

  useEffect(() => {
    const darkRoutes = ["/projects", "/about"];
    if (darkRoutes.includes(location.pathname)) setNavColor("black");
    else setNavColor("white");
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
