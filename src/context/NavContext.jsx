import React, { createContext, useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

// Create contexts
export const NavbarContext = createContext();
export const NavbarColorContext = createContext();

const NavContext = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [navColor, setNavColor] = useState("#FFFFFF"); // default white
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Define subtle color palette for light/dark theme
    const colors = {
      darkTheme: "#1A1A1A", // dark navbar for dark mode
      lightTheme: "#FFFFFF", // light navbar for light mode
      textDark: "#F8F8F8", // text in dark mode
      textLight: "#1F2937", // text in light mode
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
