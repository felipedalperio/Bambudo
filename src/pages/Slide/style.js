import {StyleSheet} from 'react-native';
import { color } from '../../config/color';

const styles = StyleSheet.create({
    container: {
        flex:1,
        overflow:'hidden',
        backgroundColor:'#fff'
        
    },
    back:{
        position:'absolute',
        height:'50%',
        width:'100%',
        bottom:0,
        zIndex: -1,
        elevation: -1,
    },
})

export default styles