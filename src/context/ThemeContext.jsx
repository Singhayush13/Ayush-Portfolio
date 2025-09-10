import { createContext, useState, useEffect } from "react";
import { gsap } from "gsap";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark"); // default dark

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Apply theme class to <html> and animate transition
  useEffect(() => {
    const html = document.documentElement;

    // Animate transition
    gsap.to("body", {
      backgroundColor: theme === "dark" ? "#101010" : "#f9fafb",
      color: theme === "dark" ? "#cfcfcf" : "#1f2937",
      duration: 0.8,
      ease: "power2.inOut",
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
    // Optional: Fade out current content
    gsap.to("body", {
      opacity: 0,
      duration: 0.25,
      onComplete: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        // Fade back in
        gsap.to("body", { opacity: 1, duration: 0.25 });
      },
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
