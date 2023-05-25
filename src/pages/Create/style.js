import { StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex:1,  
        alignItems:'center',
        justifyContent:'center',
    },
    wrapper:{
        width:'80%',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    iconCreate:{
        width:80,
        height:80,
    },
    titleCreate:{
        fontSize:40,
        color:'white'
    },
    buttonCreate:{
        backgroundColor:'black',
        alignSelf:'flex-end',
        width: '40%',
        paddingVertical:5,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:5
    },
    contentAlert: {
        marginTop:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:10
    },
    warningAlert: {
        paddingLeft:10,
        color:'#222',
        fontSize:16,
    },
    textCreate:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    },
    input:{
        width:'100%',
        backgroundColor:'#EEEFF1',
        paddingVertical:20,
        outlineStyle: 'none',
        color:'gray',
        paddingHorizontal:10,
        borderRadius:10,
        marginVertical:5
    },
    groupBall:{
        flexDirection:'row',
        marginVertical:10
    },
    ball:{
        height:10,
        width:10,
        borderRadius:10,
        backgroundColor:'black',
        marginHorizontal:5
    },
    next:{
        width: '60%',
        alignItems:'center',
        paddingVertical:10,
        backgroundColor:'white'
    },

    registerText:{
        color:'white',
        fontSize:18,
        paddingBottom:100,
        marginTop:10,
        alignSelf:'flex-start'
    },
    registerTextA:{
        color:'black',
        fontWeight:'bold',
    },  
    groupTitle:{
        flexDirection:'row'
    }
})

export default styles;