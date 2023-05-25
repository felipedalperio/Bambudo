import {StyleSheet} from 'react-native';
import { color } from '../../config/color';

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        position:'relative',      
    },

    icon:{
        width:70,
        height:70,
        resizeMode: 'contain'
    },
    titleGroup:{
        flexDirection:'row',
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        color: '#292929',
        marginVertical:15,
    },
    desc: {
        width:'80%',
        letterSpacing:1,
        textAlign:'center',
        color: '#292929'
    },
    image:{
        width:250,
        height: 250,
        marginVertical:20,
        resizeMode: 'contain',
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
        width: '50%',
        alignItems:'center',
        paddingVertical:10,
        backgroundColor:'white'
    },

    textNext:{
        fontWeight:'bold',
        fontSize:20
    },

    letsLogin: {
        alignSelf:'flex-end',
        paddingRight:50,
        marginTop:20,
        color:'white',
        fontSize:18,
    }

})

export default styles