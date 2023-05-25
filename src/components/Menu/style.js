import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      height: 60,
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      borderBottomWidth: 2,
      borderBottomColor: '#F5F5F5',
      borderStyle: 'solid',
      alignItems: 'center',
   },
   title: {
      fontWeight: '400',
      fontSize: 18,
      color: '#515151'
   },
   button: {
      width: 80,
      paddingVertical: 6,
      borderWidth: 2,
      borderStyle: 'solid',
      borderRadius: 10,
      borderColor: 'white',
      alignItems: "center",
      justifyContent: 'center',
   },
   save: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold'
   }

})

export default styles