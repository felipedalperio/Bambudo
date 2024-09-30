import React, { useEffect, useState,useContext} from 'react';
import { Animated, Easing, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { ThemeContext } from '../../store/ThemeContext'
import { color } from '../../config/color';

export default function PostLoader({limit}) {
  const [animation] = useState(new Animated.Value(0));
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateXInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 600], // Modifique esses valores conforme necessário
  });

  const animatedStyle = {
    transform: [{ translateX: translateXInterpolate }, {rotate: '45deg'}],
  };

  return (
    <View>
      {limit ? (
        <View style={{...styles.post, backgroundColor:theme.cardColor}}>
          <Animated.View style={{ ...styles.light, ...animatedStyle, backgroundColor: theme.cardColorReload }} />
        </View>
      ) : (
        <>
        <View style={{...styles.post, backgroundColor:theme.cardColor}}>
          <Animated.View style={{ ...styles.light, ...animatedStyle, backgroundColor: theme.cardColorReload }} />
        </View>
        <View style={{...styles.post, backgroundColor:theme.cardColor}}>
          <Animated.View style={{ ...styles.light, ...animatedStyle, backgroundColor: theme.cardColorReload }} />
        </View>
        <View style={{...styles.post, backgroundColor:theme.cardColor}}>
          <Animated.View style={{ ...styles.light, ...animatedStyle, backgroundColor: theme.cardColorReload }} />
        </View>
        <View style={{...styles.post, backgroundColor:theme.cardColor}}>
          <Animated.View style={{ ...styles.light, ...animatedStyle, backgroundColor: theme.cardColorReload }} />
        </View>
        </>
      )}
      
    </View>
  );
}
