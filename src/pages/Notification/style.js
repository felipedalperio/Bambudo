import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
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
    notificationWrapper:{
        width:'100%',
        paddingVertical:20,
        paddingHorizontal:10
    },
    picture:{
        width:50,
        height:50,
        resizeMode:'cover',
        borderRadius:40,
        marginRight:10,
    },
    notificationItem:{
        display:'flex',
        flexDirection:'row',
        paddingVertical:18,
        paddingHorizontal:10,
        marginBottom:20,
        backgroundColor:'#EEEFF1',
    },  

    message: {
        color:'#333',
        fontWeight:'400',
        fontSize:14,
        letterSpacing:0.5
    },
    date: {
        color:'#444',
        fontWeight:'300',
    },
    box:{
        width:26,
        height:26,
        backgroundColor:'red',
        alignItems:"center",
        justifyContent:"center",
        marginLeft:4,
        borderRadius:4
    },
    dateWrapper:{
        marginTop:5,
        flexDirection:'row',
        alignItems:"center"
    },
    circle: {
        width:10,
        height:10,
        marginRight:6,
        borderRadius:10,
        backgroundColor:'#ff5c33'
    },
    empty:{
        fontWeight:'400',
        letterSpacing:2,
        padding:20,
        fontSize:18,
        textAlign:"center"
    },
})

export default styles