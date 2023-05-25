import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Alert, ActivityIndicator, Platform } from 'react-native'
import styles from './style'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import { categories, data, homeContet } from '../../../data'
import { useSelector, useDispatch } from 'react-redux';
import { changeUser, selectUser } from '../../store/userSlice';
import { useContext, useEffect, useRef, useState } from 'react';
import firebase from '../../config/firebaseconfig'
import { List } from 'react-native-paper'
import Post from '../../components/Post'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NavigationContext } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from '../../config/color';
import { ThemeContext } from '../../store/ThemeContext'
import { setUserCurrent } from '../../config/setUserCurrent'
import Header from '../../components/Header'

//import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';


export default function Bambudo() {

  let dispatch = useDispatch();
  const database = firebase.firestore();
  const [post, setPost] = useState([])
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigation = useContext(NavigationContext);
  const isFocused = useIsFocused();
  const flatListRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const setUser = setUserCurrent();
  const userRedux = useSelector(selectUser);
  const [lastVisible, setLastVisible] = useState(null);
  const [showCat, setShowCat] = useState(false);
  const [showData, setShowData] = useState(false)
  const [nameCat, setNameCat] = useState('Categorias')
  const [nameData, setNameData] = useState('Data');
  let ads = null;
  let BannerAd = null

  if (Platform.OS !== 'web') {
    ads = require('react-native-google-mobile-ads');
    BannerAd = ads.BannerAd;
  }

  const today = new Date();
  function dataAtualFormatada() {
    var data = new Date(),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
  }
  function dataAtualFormatadaOntem() {

    var data = new Date(),
      dia = (data.getDate() - 1).toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear();

    return dia + "/" + mes + "/" + ano;
  }
  function dataMouthFistDay() {
    var data = new Date(),
      dia = '01',
      mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
  }
  function dataMouthLastDay() {
    var data = new Date(),
      dia = '31',
      mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
  }

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      try {
        let fireRef = ''
        fireRef = filterData(false)
        await fireRef.then((query) => {
          const list = [];
          let docQuery = null
          query.forEach((doc) => {
            list.push({ ...doc.data(), id: doc.id })
            docQuery = query.docs[query.docs.length - 1]
          })
          setLastVisible(docQuery);
          setPost(list)
          setLoading(false)
        })
      } catch (err) {
        Alert.alert('Oops, algo deu errado.')
        console.log(err)
        setLoading(false)
      }
      handleGoToPosition()
    }
    getPosts();


  }, [nameCat, nameData])

  const filterData = (value) => {
    let query = database.collection("posts").limit(10).where('lock', '==', false);

    if (nameData) {
      if (nameData == 'Hoje') {
        query = query.where('data', '==', dataAtualFormatada()).orderBy('dataFilter', 'desc');
      } else if (nameData == 'Ontem') {
        query = query.where('data', '==', dataAtualFormatadaOntem()).orderBy('dataFilter', 'desc');
      } else if (nameData == 'Esse Mês') {
        query = query.where('data', '>=', dataMouthFistDay()).where('data', '<=', dataMouthLastDay()).orderBy('data', 'desc');
      }else{
        query = query.orderBy("dataFilter", "desc");
      }
    }
  
    if(nameCat){
      if (nameCat != 'Todos' && nameCat != 'Categorias') {
        query = query.where('cat', '==', nameCat);
      }
    }

    if( value == true){
      if(lastVisible){
        query = query.startAfter(lastVisible);
      }
    }
  
    return query.get();
    
  }
  

  const fetchMore = async () => {
    if (lastVisible && loading == false) {
      setLoading(true)
      let fireRef = ''
      fireRef = filterData(true)
      await fireRef.then(query => {
        const list = [];
        let docQuery = lastVisible
        query.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id })
          docQuery = query.docs[query.docs.length - 1]
        })
        setLastVisible(docQuery);
        setPost([...post, ...list]);
        setLoading(false)
      })
        .catch(error => {
          console.log(error);
          console.log('entrei')
          setLoading(false)
        });
    }
  };


  /* useEffect(() => {
     navigation?.setOptions({
       tabBarStyle: { display: 'none' },
     });
   }, []); */

  const handleGoToPosition = () => {
    if (flatListRef != null) {
      flatListRef.current?.scrollToOffset({ animated: true, offset: scrollPosition });
    }
  };

  const handleScroll = (event) => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };

  useEffect(() => {
    setUser(userRedux.id);
  }, [userRedux])

  const handleEndReached = () => {
    setLimit(limit + 10);
  };


  const showCategories = () => {
    setShowCat(!showCat)
  }
  const showDate = () => {
    setShowData(!showData)
  }

  const chooseCat = (name) => {
    setNameCat(name)
    setShowCat(false)
    setScrollPosition(0)
  }
  const chooseData = (name) => {
    setNameData(name)
    setShowData(false)
    setScrollPosition(0)
  }

  return (
    <View style={styles.container}>
      { BannerAd != null && (
        <BannerAd
          unitId={ads.TestIds.BANNER}
          size={ads.BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      )}
      <Header />
      <View style={styles.categories}>
        <View style={styles.catWrapper} >
          <View style={{ ...styles.select, backgroundColor: theme.primaryColor }} >
            <TouchableOpacity style={styles.catTop} onPress={showCategories}>
              <Text style={styles.selectText}>{nameCat}</Text>
              <Icon name='caret-down' size={20} color="white" />
            </TouchableOpacity>
            <View style={{ ...styles.catBottom, height: showCat ? 'auto' : 0 }}>
              <View style={styles.slideCategorieWrapper}>
                <FlatList
                  data={categories}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity style={styles.itemCat} onPress={() => chooseCat(item.name)}>
                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                      </TouchableOpacity>
                    )
                  }}
                />

              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{ ...styles.select, backgroundColor: theme.primaryColor, right: 0 }}>
            <TouchableOpacity style={styles.dataTop} onPress={showDate}>
              <Text style={styles.selectText}>{nameData}</Text>
              <Icon name='caret-down' size={20} color="white" />
            </TouchableOpacity>
            <View style={{ ...styles.dataBottom, height: showData ? 'auto' : 0 }}>
              <View style={styles.slideDataWrapper}>
                {data.map((item, key) => (
                  <TouchableOpacity key={key} style={styles.itemData} onPress={() => chooseData(item.name)}>
                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                  </TouchableOpacity>
                ))}

              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.posts} >

        {post.length != 0 ? (
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            data={post}
            onEndReached={fetchMore}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.5}
            onScroll={handleScroll}
            renderItem={({ item }) => {
              return (
                <Post item={item} database={database} post={post} setPost={setPost} />
              )
            }}
          />

        ) : (

          <Text style={{ ...styles.empty, color: theme.textColor }}>
            {
              loading != true && "Nenhuma Postagem encontrada."
            }

          </Text>
        )}
        {loading && (
          <ActivityIndicator size={54} color={theme.primaryColor} style={styles.progressBar} />
        )}
      </View>

    </View>
  )
}