import React, { createContext, useEffect, useState } from 'react';
import { color, wichColor } from '../config/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [num, setNum] = useState(0);
  const [theme, setTheme] = useState(wichColor(0));
  const [darkMode, setDarkmode] = useState(false);

  const changeTheme = newTheme => {
    console.log(darkMode);
    setTheme(wichColor(newTheme, darkMode))
  };

  const getColorNum = () => {
    const mode = darkMode;
    AsyncStorage.getItem('color').then((item) => {
      if (item) {
        if (parseInt(item) > wichColor('todos', mode).length) {
          setNum(0)
          setTheme(wichColor(0, mode))
        } else {
          setNum(parseInt(item))
          setTheme(wichColor(parseInt(item), mode))
        }
      }
    }).catch((error) => {
      setNum(0)
      setTheme(wichColor(0, false))
    });
  }

  useEffect(() => {
  
    const getDarkMode = () => {
      AsyncStorage.getItem('darkmode').then((item) => {
        if (item) {
          setDarkmode(JSON.parse(item))
        }
      }).catch((error) => {
        setDarkmode(false)
      });
    }
    getDarkMode();
    getColorNum();
  }, [])


  useEffect(() => {
    getColorNum();
  }, [darkMode])

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, darkMode, setDarkmode }}>
      {children}
    </ThemeContext.Provider>
  );
};