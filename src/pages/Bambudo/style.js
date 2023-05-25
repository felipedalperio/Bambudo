import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1,
        
    },
    categories:{
        flexDirection:'row',
        paddingVertical:25,
        paddingHorizontal:10,
        justifyContent:'space-between',
        zIndex:1,
        width:'100%',
        height:70
        
     
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
    catBottom:{
        height:'auto',
        overflow:'hidden'
    },
    dataBottom:{
        height:'auto',
        overflow:'hidden'
    },
    slideCategorieWrapper:{
        marginVertical:10
    },
    slideDataWrapper:{
        marginVertical:10
    },
    itemCat:{
        backgroundColor:'white',
        marginVertical:3,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        paddingVertical:4
    },
    itemData:{
        backgroundColor:'white',
        marginVertical:3,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        paddingVertical:4
    },
    posts:{
        paddingHorizontal:10,
        marginTop:20,
        flex: 1
        
    },
    selectText:{
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