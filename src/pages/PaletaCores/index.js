import { View, Text, TouchableOpacity, Platform } from 'react-native'
import styles from './style'
import Icon from 'react-native-vector-icons/EvilIcons'
import * as Animatable from 'react-native-animatable';
import { wichColor } from '../../config/color';
import { useContext, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../../store/ThemeContext';
import { FlatList } from 'react-native-gesture-handler';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

  const adUnitId =  TestIds.REWARDED;

  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });


export default function PalletaCores({ show, setShow, setColor }) {

  const { theme } = useContext(ThemeContext);
  const isFocused = useIsFocused();

  const chooseColor = async (num) => {
    setColor(num);
    setShow(false);
  }

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
        rewarded.show();
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, [isFocused]);

  return (
    <Animatable.View animation="slideInUp" duration={1000} style={styles.container}>
      <View style={{ ...styles.titleView, backgroundColor: theme.primaryColor }}>
        <Text style={styles.title}> Escolha uma cor! </Text>
        <TouchableOpacity onPress={() => setShow(false)}>
          <Icon name="close-o" color="#fff" size={30} />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={wichColor('todos')}
        style={{ width: '95%' }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={styles.wrapper} key={index} onPress={() => chooseColor(index)}>
              <Text style={{ ...styles.textColor, color: item.primaryColorDark }}>{item.text}</Text>
              <View style={styles.paleta}>
                <View style={{ ...styles.box, backgroundColor: item.primaryColorLight }}></View>
                <View style={{ ...styles.box, backgroundColor: item.primaryColor, marginHorizontal: 5 }}></View>
                <View style={{ ...styles.box, backgroundColor: item.primaryColorDark }}></View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </Animatable.View>
  )
}