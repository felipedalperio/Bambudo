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
    },
    catWrapper:{
        display:'flex',
        zIndex:2,
        marginTop:10,
        paddingBottom:38,
        marginHorizontal:20,
    },
    select:{
        width:150,
        borderRadius:8,
        padding:10,
        position:"absolute"
    },
    catTop:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    dataTop:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    itemCat:{
        backgroundColor:'white',
        marginVertical:3,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        paddingVertical:4
    },
    selectText:{
        fontWeight:'500',
        color:'white'
    },
    slideCategorieWrapper:{
        marginVertical:10
    },
    slideDataWrapper:{
        marginVertical:10
    },
})

export default styles