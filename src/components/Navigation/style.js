import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    circle: {
        height:80,
        width: 80,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        bottom:30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
      }
    
})

export default styles;