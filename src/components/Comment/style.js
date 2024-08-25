import { StyleSheet } from "react-native"
import { color } from '../../config/color';

const styles = StyleSheet.create({
    container:{
        margin:10,
        flexDirection:'column',

    },
    wrapper:{
        flexDirection:'row',
        alignItems:"center",
        flex:1,
        
    },
    commentComment:{
        margin:5,
        paddingHorizontal:30,
        flexDirection:'row',
        alignItems:"center"
        
    },
    commentCommentWrapper: {
        marginTop: 20
    },
    picture:{
        width:50,
        height:50,
        resizeMode:'cover',
        borderRadius:40,
        marginRight:10,
    },

    picture2:{
        width:30,
        height:30,
        resizeMode:'cover',
        borderRadius:20,
        marginRight:10,
    },
    info:{
        flex:4,
        paddingHorizontal:10
    },
    name:{
        flex:1,
        fontSize:20,
        fontWeight:'500'
    },
    nameC:{
        flex:1,
        fontSize:16,
        fontWeight:'500'
    },
    descC:{
        letterSpacing:1,
        paddingVertical:5,
        fontSize:14
    },
    likeText:{
        flexDirection:'row'
    },
    desc:{
        letterSpacing:1,
        paddingVertical:10,
        fontSize:16
    },
    likeOrComment:{
        flexDirection:'row',
        alignItems:'flex-end',
    },
    textCommentOrLike:{
        color: '#418F87',
        fontWeight:'500'
    },
    left:{
        flexDirection:'row',
        alignItems:'center'
    },
    likes:{
        marginRight:10
    },
    form:{
        flexDirection:'row',
        alignItems:'flex-end',
    },
    inputText:{
        outlineStyle:'none',
       
        borderBottomColor:'#418F87',
        borderLeftColor:'transparent',
        borderRightColor:'transparent',
        borderTopColor:'transparent',
        borderStyle:'solid',
        borderWidth:2,
        marginTop:5,
        marginHorizontal:10,
        paddingVertical:5,
        flex:1
    },
    send:{
        padding:5,
        fontWeight:'400',
        backgroundColor:'#5CC6BA',
        borderRadius:4,
        paddingHorizontal:10
    },
    sendText:{
        color:'white'
    },
    excluir:{
        fontWeight:'500',
        color:'#FF4040'
    },
    top:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
})

export default styles