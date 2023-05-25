import { StyleSheet,Platform,StatusBar} from "react-native"

const styles = StyleSheet.create({
    wrapper:{
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        flex:1,
    },
    container:{
        paddingVertical:10,
        paddingHorizontal:20,
        backgroundColor:'white',
        flex:1
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
        position:'relative',
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
        color:'#418F87'
    },
    wrapperInfo:{
        position:'relative',
        zIndex:-1,
        elevation:-1
    },
    catText:{
        fontWeight:'500'
    },  
    desc:{
        paddingHorizontal:10,
        outlineStyle: 'none',
        color:'#838383',
        fontSize:18,
    },
    
})

export default styles