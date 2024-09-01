import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Alert, ActivityIndicator, Platform, ScrollView } from 'react-native'
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
import PostLoader from '../../components/PostLoader'

//import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
  const Bambudo = () => {
  
    let dispatch = useDispatch();
    const database = firebase.firestore();
    const [post, setPost] = useState([])
    const [limit, setLimit] = useState(10);
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
    const [firstLoad, setFirstLoad] = useState(true);
    const [hasMoreData, setHasMoreData] = useState(true); 
    //let ads = null;
    let BannerAd = null
    //
    if (Platform.OS !== 'web') {
      //ads = require('react-native-google-mobile-ads');
      //BannerAd = ads.BannerAd;
    }
  
    useEffect(() => {
      const getPosts = async () => {
        setLoading(true);
        try {
          const query = await filterData(false);
          const list = [];
          let docQuery = null;
    
          query.forEach(doc => {
            list.push({ ...doc.data(), id: doc.id });
            docQuery = query.docs[query.docs.length - 1];
          });
    
          setLastVisible(docQuery);
    
          // Filtra os posts para evitar duplicidade
          setPost(prevPosts => {
            const existingIds = new Set(prevPosts.map(post => post.id));
            const newPosts = list.filter(post => !existingIds.has(post.id));
            return [...prevPosts, ...newPosts];
          });
    
        } catch (err) {
          Alert.alert('Oops, algo deu errado.');
          console.log(err);
        } finally {
          setLoading(false);
        }
        handleGoToPosition();
      };
      getPosts();
    }, [nameCat, nameData]);
  
    const filterData = async (value) => {
      let query = database.collection("posts")
        .limit(limit)
        .where('lock', '==', false)
        .orderBy('dataFilter', 'desc');
  
      if (nameCat && nameCat !== 'Todos' && nameCat !== 'Categorias') {
        query = query.where('cat', '==', nameCat);
      }
  
      if (value && lastVisible) {
        query = query.startAfter(lastVisible);
      }
  
      return query.get();
    };



    const fetchMore = async () => {
      if (!loading && lastVisible) {
        setLoading(true);
        try {
          const query = await filterData(true);
          const list = [];

          query.forEach((doc, index) => {
            if (doc.exists) {
              list.push({ ...doc.data(), id: doc.id });
              if (index === query.docs.length - 1) {
                docQuery = doc;
              }
            }
          });

           // Se a consulta não retornar nenhum documento, marca que não há mais dados
           if (list.length === 0) {
            setLastVisible(null); // Marca que não há mais dados
            return;
          } 

          console.log("fetchMore")
    
          // Filtra os posts para evitar duplicidade
          setPost(prevPosts => {
            const existingIds = new Set(prevPosts.map(post => post.id));
            const newPosts = list.filter(post => !existingIds.has(post.id));
            return [...prevPosts, ...newPosts];
          });

          setLastVisible(query.docs[query.docs.length - 1]);
          
        
        } catch (error) {
          console.log('Error fetching more posts:', error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    useEffect(() => {
      setUser(userRedux.id);
    }, [userRedux]);
  
    const handleGoToPosition = () => {
      flatListRef.current?.scrollToOffset({ animated: true, offset: scrollPosition });
    };
  
    const handleScroll = (event) => {
      setScrollPosition(event.nativeEvent.contentOffset.y);
    };
  
    const showCategories = () => {
      setShowCat(prev => !prev);
    };
  
    const showDate = () => {
      setShowData(prev => !prev);
    };
  
    const chooseCat = (name) => {
      setPost([]); //limpanmdo lista
      setNameCat(name);
      setShowCat(false);
      setScrollPosition(0);
    };
  
    const chooseData = (name) => {
      setNameData(name);
      setShowData(false);
      setScrollPosition(0);
    };
  
    return (
      <View style={styles.container}>
        {/* BannerAd code if not on web */}
        {Platform.OS !== 'web' && BannerAd != null && (
          <BannerAd
            unitId={ads.TestIds.BANNER}
            size={ads.BannerAdSize.FULL_BANNER}
            requestOptions={{ requestNonPersonalizedAdsOnly: true }}
          />
        )}
        <Header />
        <View style={styles.categories}>
          <View style={styles.catWrapper}>
            <View style={{ ...styles.select, backgroundColor: theme.primaryColor }}>
              <TouchableOpacity style={styles.catTop} onPress={showCategories}>
                <Text style={styles.selectText}>{nameCat}</Text>
                <Icon name='caret-down' size={20} color="white" />
              </TouchableOpacity>
              <View style={{ ...styles.catBottom, height: showCat ? 'auto' : 0 }}>
                <View style={styles.slideCategorieWrapper}>
                  <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.itemCat} onPress={() => chooseCat(item.name)}>
                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
            <View style={{ ...styles.select, backgroundColor: theme.primaryColor, right: 0, display: 'none' }}>
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
        <View style={styles.posts}>
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            data={post}
            onEndReached={fetchMore}
            keyExtractor={item => item.id}
            initialNumToRender={10} // Ajuste conforme necessário
            maxToRenderPerBatch={20} 
            onEndReachedThreshold={1.5}
            onScroll={handleScroll}
            renderItem={({ item }) => <Post item={item} database={database} post={post} setPost={setPost} />}
            ListFooterComponent={
              loading && (
                !lastVisible ? <PostLoader /> : <PostLoader limit={true} />
              )
            }
          />
          {post.length === 0 && !loading && (
            <Text style={{ ...styles.empty, color: theme.textColor }}>
              Nenhuma Postagem encontrada.
            </Text>
          )}
        </View>
      </View>
    );
  };
  
  export default Bambudo;