import { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={{ darkMode: false, toggleDarkMode: () => {} }}>
    {children}
  </ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
