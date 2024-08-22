import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    post:{
        backgroundColor:'#EEEFF1',
        borderRadius:10,
        marginVertical:15,
        paddingTop:4,
        paddingHorizontal:15,
        paddingBottom:15,
        height:265,
        overflow:"hidden",
        justifyContent:"center",
        position:"relative"
    },

    light: {
        position:"absolute",
        height:900,
        width: 80,
        backgroundColor:'#FFFFFF88',
        transform: [{ rotate: '45deg' }]
    }

})

export default styles