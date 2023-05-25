import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        margin: 'auto',
        width: '80%',
        alignItems: "center",
        borderRadius:20,
        backgroundColor: '#EAEAEA',
        padding:10,
        alignItems:'center',
        overflow:'hidden',
  
    },
    CatGroup:{
        flexDirection:'column',
        paddingHorizontal:20,
        paddingVertical:10,
        width: '100%',
        marginBottom:14
        
    },
    button:{
        backgroundColor:'white',
        width: '100%',
        marginVertical:5,
        borderRadius:10
    },
    text:{
        fontSize:16,
        marginHorizontal:10,
        marginVertical:10,
        textAlign:'center',
    },
    title:{
        fontSize:18,
        fontWeight:'500',
        letterSpacing:1,
    }
})

export default styles