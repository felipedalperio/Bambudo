import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    post:{
        backgroundColor:'#EEEFF1',
        borderRadius:10,
        marginVertical:15,
        paddingTop:4,
        paddingHorizontal:15,
        paddingBottom:15

    },
    iconButton:{
        flexDirection:'row',
        alignItems:'center'
    },  
    more:{
        marginTop:10
    },
    cat:{
        textAlign:'right'
    },
    info:{
        flexDirection:'row',
        position:'relative',
        paddingTop:10,
        paddingBottom:5,
        alignItems:'center',
        bottom:10
    },  
    imgProfile:{
        width:60,
        height:60,
        borderRadius:50,
        resizeMode:'cover',
        marginRight:20
    },
    humor:{
        width:30,
        height:30,
        position:'absolute',
        right:0

    },
    name:{
        fontSize:18,
        borderBottomWidth:2,
        borderStyle:'solid',
    },
    content:{
        paddingHorizontal:30
    },
    title:{
        fontSize:20,
        marginBottom:4
    },
    desc:{
        
    },
    infoPost:{
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    right:{
        alignItems:'center',
        flexDirection:'row'
    },
    selectText:{
        color:'white'
    },
    catGroup:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:10,
    },
    catRight:{
        flexDirection:'row'
    },
    delete:{
        color:'red',
        marginRight:10
    }


})

export default styles