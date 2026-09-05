import { createContext, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark"); // default dark
  const transitionTimeoutRef = useRef(null);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Apply theme class to <html> and animate transition
  useEffect(() => {
    const html = document.documentElement;

    // Animate transition
    gsap.killTweensOf("body");
    gsap.to("body", {
      backgroundColor: theme === "dark" ? "#101010" : "#f9fafb",
      color: theme === "dark" ? "#cfcfcf" : "#1f2937",
      duration: 0.45,
      ease: "none",
    });

    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme with page fade animation
  const toggleTheme = () => {
    gsap.killTweensOf("body");
    document.documentElement.classList.add("theme-transitioning");
    setTheme(theme === "dark" ? "light" : "dark");

    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 450);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
