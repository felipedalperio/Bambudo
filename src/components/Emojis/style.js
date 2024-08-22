import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        margin: 'auto',
        width: '100%', 
        height: 400,
        left: 0,
        alignItems: "center",
        borderRadius:20,
        backgroundColor: '#EAEAEA',
        padding:10,
        justifyContent:'center',
        elevation:2,
        zIndex:2,
        overflow:'hidden',
    },
    emojiGroup:{
        paddingHorizontal:20,
        paddingVertical:10,
        flex:1,

    },
    select:{
        alignItems:'flex-start',
        justifyContent:"center",
        width:'100%',
        borderRadius:40,
        paddingHorizontal:20,
        overflow:'hidden',
        paddingVertical:5
    },
    emojiType:{
        position:'relative',
        marginHorizontal:12,
        alignItems:'center',
        flex:1
    },
    name:{
        fontWeight:'500',
        color:'white',
        fontSize:16,
        marginTop:4
    },
    imageEmoji:{
        width:30,
        height:30,
        resizeMode:'contain',
        marginHorizontal:10,
        marginVertical:10,
    },
    title:{
        fontSize:18,
        fontWeight:'500',
        letterSpacing:1
    },
    progressBar:{
        alignSelf:'flex-start'
    }
 
})

export default styles