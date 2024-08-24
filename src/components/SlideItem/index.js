import { Text, View, Image, TouchableOpacity } from 'react-native';
import Login from '../../pages/Login';
import styles from './style';
import { vw } from 'react-native-expo-viewport-units';

export default function SlideItem({ props, setIndex, theme }) {
  const SlidePosition = () => {
    setIndex(props.id + 1)
  }
  return (
    <View style={{ ...styles.container, width: vw(100) }}>
      {props.id != 3
        ? (
          <>
            <Image style={styles.icon} source={props.icon} color={theme.primaryColor} />
            <View style={styles.titleGroup}>
              {
                props.title.map((name, key) => {
                  return (
                    <Text style={{ ...styles.title, color: `${key == 0 ? theme.primaryColor : '#292929'}` }} key={key}>{name}</Text>
                  )
                })

              }
            </View>
            <Text style={styles.desc}>{props.desc}</Text>
            <Image style={styles.image} source={props.picture} />

            <View style={styles.groupBall}>
              <View style={{ ...styles.ball, backgroundColor: props.ball[0] }}></View>
              <View style={{ ...styles.ball, backgroundColor: props.ball[1] }}></View>
              <View style={{ ...styles.ball, backgroundColor: props.ball[2] }}></View>
              <View style={{ ...styles.ball, backgroundColor: props.ball[3] }}></View>
            </View>
            <TouchableOpacity style={styles.next} onPress={SlidePosition}>
              <Text style={{ ...styles.textNext, color: theme.primaryColor }}>Próximo</Text>
            </TouchableOpacity>
            <Text style={styles.letsLogin} onPress={() => setIndex(3)}>Pular para o login.</Text>
          </>
        )
        : (
          <Login props={props} setIndex={setIndex} />
        )
      }
    </View>

  )
}
