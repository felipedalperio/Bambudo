import styles from './style'

import { View} from 'react-native'
import SlideItem from '../../components/SlideItem';
import { slide } from '../../../data';
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import {useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../../store/ThemeContext';

export default function Slide({navigation}) {
  const scrollRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const[index,setIndex] = useState(0);

  useEffect(() => {
    if(scrollRef){
      scrollRef.current.scrollToIndex({index: index})
    }
  },[index])
  

  return (
    <View style={styles.container}>
        <SwiperFlatList
          data={slide}
          ref={scrollRef}
          horizontal
          index={index}
          renderItem={({item}) => {
            return (
              <SlideItem props={item} index={index} setIndex={setIndex} navigation={navigation} theme={theme} scrollRef={scrollRef} />
            )
          }}
        />
       <View style={{...styles.back, backgroundColor:theme.primaryColor}} ></View>
        
     
    </View>
  )
}
