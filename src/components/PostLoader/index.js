import React, { useEffect, useState } from 'react';
import { Animated, Easing, TouchableOpacity, View } from 'react-native';
import styles from './style';

export default function PostLoader({limit}) {
  const [animation] = useState(new Animated.Value(0));

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
        <View style={styles.post}>
          <Animated.View style={{ ...styles.light, ...animatedStyle }} />
        </View>
      ) : (
        <>
        <View style={styles.post}>
          <Animated.View style={{ ...styles.light, ...animatedStyle }} />
        </View>
        <View style={styles.post}>
          <Animated.View style={{ ...styles.light, ...animatedStyle }} />
        </View>
        <View style={styles.post}>
          <Animated.View style={{ ...styles.light, ...animatedStyle }} />
        </View>
        <View style={styles.post}>
          <Animated.View style={{ ...styles.light, ...animatedStyle }} />
        </View>
        </>
      )}
      
    </View>
  );
}
