import { View, Image, Text } from "react-native";
import styles from "./style";
import firebase from "../../config/firebaseconfig";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../store/ThemeContext";
import { setUserCurrent } from "../../config/setUserCurrent";

export default function Loading() {
    const { theme } = useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../storage/splash3.png')}/>
        </View>
    );
}