import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
export default function Header() {
    const styles={
        header:{
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 20,
            position:"absolute",
            top:10,
            Colors
          }
          
    }
  return (
    <>
<Text style={{position:"absolute",top:10,fontSize:24,fontWeight: 'bold', marginTop: 25,backgroundColor:'#808080d4',margin:10,padding:10,width:400,textAlign:"center"}} >Calculator</Text>  
    
    </>
)
}
