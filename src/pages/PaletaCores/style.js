import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container:{
        
        position: 'absolute', 
        alignItems: 'center',
        width:'100%',
        height:'100%',
        zIndex:2,
        elevation:2,
        backgroundColor:'#f3f3f3',
        overflow:'hidden'
    },
    titleView:{
        height:60,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:15,
        width:'100%',
        flexDirection:"row",
        marginBottom:10
    },
    title:{
        fontSize:20,
        fontWeight:'400',
        color:'white'
    },
    wrapper:{
        width:'100%',
        flexDirection:"row",
        alignItems:'center',
        marginVertical:5,
        padding:10,
        justifyContent:'space-between',
        backgroundColor:'#fff',
        borderRadius:10,
    },
    paleta:{
        alignItems:'center',
        paddingHorizontal:20,
        flexDirection:"row"
    },box:{
        width:20,
        height:20,
    },
    textColor:{
        fontSize:20,
        fontWeight:'400'
    },
})

export default styles