import { StyleSheet } from "react-native"
import { color } from '../../config/color';

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#5CC6BA'
    },
    img:{
        width:'100%',
        height:'95%',
        resizeMode:'contain'
    },
    icon:{
        width:100,
        height:100
    },
    textGroup:{
        flexDirection:'row'
    },
    text1:{
        fontSize:26,
        color:'white',
    },
    text2:{
        fontSize:26,
    }
});

export default styles;