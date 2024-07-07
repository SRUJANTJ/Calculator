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
<Text style={{
  position: "absolute",
  top: 10,
  fontSize: 24,
  fontWeight: 'bold',
  marginTop: 25,
  backgroundColor: '#2944BB',
  margin: 10,
  padding: 10,
  width: 400,
  textAlign: "center",
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Adding text shadow
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Adding box shadow
  borderRadius: 10, // Rounded corners
  color: 'white', // Text color
}}>
  Calculator
</Text>
    
    </>
)
}
