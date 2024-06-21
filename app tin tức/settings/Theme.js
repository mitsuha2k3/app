import React, { createContext, useState, useContext } from 'react'
import DarkTheme from '../settings/DarkTheme'
import LightTheme from '../settings/LightTheme'

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(LightTheme)

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.dark ? LightTheme : DarkTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext)
