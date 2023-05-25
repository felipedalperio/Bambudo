import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
    },
    user:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        position:'relative',
        
    },
    name:{
        fontSize:20,
        borderBottomWidth:2,
        borderStyle:'solid',
        paddingBottom:4,
        marginBottom:4

    },
    imageProfile:{
        width:80,
        height:80,
        borderRadius:50,
        resizeMode:'cover',
        marginRight:30
    },
    humor:{
        width:50,
        height:50,
        resizeMode:'cover',
        position:"absolute",
        right:30
    },
    content:{
        paddingHorizontal:20,
        paddingVertical:10,
        flex:1
    },
    top:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
    },
    title:{
        fontSize:24,
        flex:4
    },
    cat:{
        fontSize:16,
        fontWeight:'500',
        flex:1
    },
    desc:{
        fontSize:16,
        paddingVertical:10
    },

    bottom:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'flex-end'
    },
    iconButton:{
        flexDirection:"row",
        alignItems:'center'
    },
    titleComment:{
        fontSize:18,
        fontWeight:'500',
    },
    formComment:{
        flexDirection:'row',
        paddingVertical:10,
        alignItems:'center'
    },
    inputComment:{
        outlineStyle:'none',
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#ddd',
        padding:12,
        borderRadius:10,
        flex:1
    },
    buttonComment:{
        borderRadius:10,
        paddingVertical:15,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:5,
        width: 80,
    },
    textButtonComment:{
        color:'white',
        fontSize:18,
    },
    commentsList:{
        marginTop:10,
        marginBottom:120,
        flex:1,
    },
    updateOrDelete:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:20,
    },
    buttonDelete:{
        width:30,
        height:30,
        borderRadius:4,
        backgroundColor:'#FF4040',
        alignItems:'center',
        justifyContent:'center'
        
    },
    buttonUpdate: {
        marginRight:15,
        flexDirection:'row',
        borderRadius:4,
        width:30,
        height:30,
        backgroundColor:'#FFBE5B',
        alignItems:'center',
        justifyContent:'center'
    },
    viewUD:{
        flexDirection:'row', alignItems:'center'
    }

})

export default styles