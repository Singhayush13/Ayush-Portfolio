// src/context/NavContext.js
import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

// Provide two contexts: one for nav open state, one for nav color
export const NavbarContext = createContext([false, () => {}]);
export const NavbarColorContext = createContext(["#FFFFFF", () => {}]);

const NavContext = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [navColor, setNavColor] = useState("#FFFFFF");
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Subtle color palette for navbar background (uses CSS variables recommended in app)
    const colors = {
      darkTheme: "rgba(10,11,12,0.88)", // slightly transparent dark
      lightTheme: "rgba(255,255,255,0.92)", // slightly transparent light
    };

    setNavColor(theme === "dark" ? colors.darkTheme : colors.lightTheme);
  }, [location, theme]);

  return (
    <NavbarContext.Provider value={[navOpen, setNavOpen]}>
      <NavbarColorContext.Provider value={[navColor, setNavColor]}>
        {children}
      </NavbarColorContext.Provider>
    </NavbarContext.Provider>
  );
};

export default NavContext;
