import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

/** * Professional Design Palette
 * Using subtle alpha transparency for high-end glassmorphism
 */
const NAV_THEMES = {
  dark: "rgba(10, 11, 12, 0.85)",
  light: "rgba(255, 255, 255, 0.92)",
};

// Initialize Contexts with null for safety checks
export const NavbarContext = createContext(null);
export const NavbarColorContext = createContext(null);

/**
 * Custom Hooks for clean, safe access across the app
 */
export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("useNavbar must be used within a NavProvider");
  return context;
};

export const useNavbarColor = () => {
  const context = useContext(NavbarColorContext);
  if (!context) throw new Error("useNavbarColor must be used within a NavProvider");
  return context;
};

const NavProvider = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [navColor, setNavColor] = useState(NAV_THEMES.light);
  
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  // Sync Navbar color with Theme and Route changes
  useEffect(() => {
    setNavColor(theme === "dark" ? NAV_THEMES.dark : NAV_THEMES.light);
  }, [theme]);

  // Auto-close navigation when user changes routes
  useEffect(() => {
    setNavOpen(false);
  }, [location]);

  /** * Memoize values to prevent unnecessary re-renders 
   * of all consuming components when only one value changes.
   */
  const navValue = useMemo(() => ({
    navOpen,
    setNavOpen,
    toggleNav: () => setNavOpen(prev => !prev),
    closeNav: () => setNavOpen(false)
  }), [navOpen]);

  const colorValue = useMemo(() => ({
    navColor,
    setNavColor
  }), [navColor]);

  return (
    <NavbarContext.Provider value={navValue}>
      <NavbarColorContext.Provider value={colorValue}>
        {children}
      </NavbarColorContext.Provider>
    </NavbarContext.Provider>
  );
};

export default NavProvider;