import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    post:{
        backgroundColor:'#F9F9F9',
        borderRadius:10,
        marginVertical:15,
        padding:20,
       /* shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,*/

       
    },
    iconButton:{
        flexDirection:'row',
        alignItems:'center'
    },  
    more:{
        color:'black',
        color:'#278F84',
        marginTop:10
    },
    cat:{
        textAlign:'right',
        color:'#515151', 
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
        borderColor: '#5CC6BA',
        borderBottomWidth:2,
        borderStyle:'solid',
    },
    content:{
        paddingHorizontal:30
    },
    title:{
        fontSize:20,
        color:'#418F87',
        marginBottom:4
    },
    desc:{
        color:'#515151',
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
    }

})

export default styles