import React, { createContext, useEffect, useState } from 'react';
import { color, wichColor } from '../config/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [num, setNum] = useState(0);
  const [theme, setTheme] = useState(wichColor(0));

  const changeTheme = newTheme => {
    setTheme(wichColor(newTheme))
  };


  useEffect( () => {
    const getColorNum = () => {
       AsyncStorage.getItem('color').then((item)=>{
          if(item){
            if(parseInt(item) > wichColor('todos').length){
              setNum(0)
              setTheme(wichColor(0))
            }else{
              setNum(parseInt(item))
              setTheme(wichColor(parseInt(item)))
            }
          }
        }).catch((error) => {
          setNum(0)
          setTheme(wichColor(0))
        });
    }
     getColorNum();
  },[])

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};