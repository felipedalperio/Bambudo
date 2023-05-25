import { StyleSheet } from "react-native"
import { color } from '../../config/color';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    posts:{
        paddingHorizontal:20,
        paddingVertical:10,
        flex:1,

    },
    titleGroup:{
        alignItems:'center',
        justifyContent:"center",
        flexDirection:'row',
        paddingVertical:10
    },
    textProfile:{
        fontSize:18,
        textAlign:'center',
        fontWeight:'500',
        color:'white'
    },
    empty:{
        fontWeight:'400',
        letterSpacing:2,
        padding:20,
        fontSize:18,
        textAlign:"center"
    }
})

export default styles