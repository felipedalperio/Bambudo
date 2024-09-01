import { StyleSheet,Platform,StatusBar} from "react-native"
import { color } from '../../config/color';

const styles = StyleSheet.create({
    wrapper:{
        flex:1, 
    },
    container:{
        paddingHorizontal:20,
        backgroundColor:'white',
        flex:1,
    },
    options:{
        flexDirection:"row",
        justifyContent:'space-between',
        marginVertical:10,
    },
    optionText:{
        padding:10,
        borderWidth:1,
        borderColor:'lightgray',
        borderStyle:'solid',
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center'
    },
    wrapperOptions:{
   
    },
    emoji:{
        width:20,
        height:20,
        marginLeft:10,
        resizeMode:'contain'
    },
    title:{
        outlineStyle: 'none',
        padding:10,
        fontSize:26,
    },
    wrapperInfo:{
        position:'relative',
        zIndex:-1,
        elevation:-1,
        marginBottom:120,
        flex:1
    },
    catText:{
        fontWeight:'500'
    },  
    desc:{
        paddingHorizontal:10,
        marginLeft:0,
        outlineStyle: 'none',
        color:'#838383',
        flex:1,
        fontSize:18,
        textAlignVertical: "top",
        marginBottom:4,
    },
    titleGroup:{
        alignItems:'center',
        justifyContent:"center",
        flexDirection:'row',
        backgroundColor:'#5CC6BA',
        paddingVertical:10
    },
    textTitle:{
        fontSize:18,
        textAlign:'center',
        color:'white',
        fontWeight:'500'
    },
    lockOrUnlockButton: {
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
    }
})

export default styles