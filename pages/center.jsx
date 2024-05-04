import { View, Text, Image, ScrollView, TouchableOpacity, TextInput,StyleSheet,FlatList,Alert   } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React,{useState } from 'react';

export default function Center() {
    const [result, setResult] = useState('');
    const [solved, setSolved] = useState('');
    
    const nthRoot = (number, root) => {
      if (root === 0) return 'Undefined';
      if (number < 0 && root % 2 === 0) return 'Undefined'; // Negative numbers cannot have an even root
      return Math.pow(number, 1 / root);
    };
    
    const pressed = (value) => {
      if (value === 'close') {
        // Remove the last character from the result
        setResult((prevResult) => prevResult.slice(0, -1));
      } else if (value === '=') {
        // Perform calculation
        try {
          const evalResult = eval(result);
          setSolved(evalResult.toString());
        } catch (error) {
          console.error(error);
        }
      } else if (value === '+/-') {
        // Toggle positive/negative sign if result is not empty
        if (result !== '') {
          setResult((prevResult) => {
            if (prevResult.charAt(0) === '-') {
              // If negative, remove the negative sign
              return prevResult.slice(1);
            } else {
              // If positive, add a negative sign before the number
              return '-' + prevResult;
            }
          });
        }
      } else if (value === '%') {
        // Calculate percentage
        setResult((prevResult) => {
          try {
            const numbers = prevResult.split(/([-+*/])/);
            let num1 = parseFloat(numbers[numbers.length - 3]);
            const operator = numbers[numbers.length - 2];
            const num2 = parseFloat(numbers[numbers.length - 1]);
    
            if (operator === '-') {
              num1 -= (num1 * (num2 / 100));
            } else if (operator === '+') {
              num1 += (num1 * (num2 / 100));
            } else if (operator === '/') {
              num1 /= (1 - (num2 / 100));
            } else if (operator === '*') {
              num1 *= (1 - (num2 / 100));
            }
    
            return num1.toString();
          } catch (error) {
            console.error(error);
            return prevResult;
          }
        });
        setSolved('');
      } else if (value === 'CE' || value === 'Clear') {
        // Clear both result and solved
        setResult('');
        setSolved('');
      } else if (value === 'X') {
        // Perform multiplication
        setResult((prevResult) => {
          // Ensure there is a non-empty string before 'X'
          if (prevResult !== '' && prevResult.charAt(prevResult.length - 1) !== 'X') {
            return prevResult + '*';
          }
          return prevResult;
        });
      } else if (value === '-' || value === '+' || value === '/') {
        // Check if the last character is already a mathematical operator
        const lastChar = result.charAt(result.length - 1);
        if (!['-', '+', '/', '*'].includes(lastChar)) {
          setResult((prevResult) => prevResult + value);
        }
      } else if (value === 'sqrt') {
        // Square root
        setResult((prevResult) => {
          try {
            const num = Math.sqrt(parseFloat(prevResult));
            setSolved(num.toString());
            return num.toString();
          } catch (error) {
            console.error(error);
            return prevResult;
          }
        });
      } else if (value === 'x^2') {
        // x square
        setResult((prevResult) => {
          try {
            const num = parseFloat(prevResult) ** 2;
            setSolved(num.toString());
            return num.toString();
          } catch (error) {
            console.error(error);
            return prevResult;
          }
        });
      } else if (value === '2root x') {
        // nth root
        setResult((prevResult) => {
          try {
            const num = nthRoot(parseFloat(prevResult), 2);
            setSolved(num.toString());
            return num.toString();
          } catch (error) {
            console.error(error);
            return prevResult;
          }
        });
      } else {
        setResult((prevResult) => prevResult + value);
      }
    
      if (value === 'C') {
        setResult('');
        setSolved('');
      } else if (value === 'CC') {
        setResult('');
      }
    };
    
    const NUMBERS = [
      { number: '%', value: '%' },
      { number: 'CE', value: 'Clear' },
      { number: 'C', value: 'C' },
      { number: '⌫', value: 'close' },
      { number: 'x^2', value: 'x^2' },
      { number: '2√x', value: '2root x' },
      { number: '√', value: 'sqrt' },
      { number: 'X', value: 'X' },
      { number: '7', value: '7' },
      { number: '8', value: '8' },
      { number: '9', value: '9' },
      { number: '/', value: '/' },
      { number: '4', value: '4' },
      { number: '5', value: '5' },
      { number: '6', value: '6' },
      { number: '-', value: '-' },
      { number: '1', value: '1' },
      { number: '2', value: '2' },
      { number: '3', value: '3' },
      { number: '+', value: '+' },
      { number: '+/-', value: '+/-' },
      { number: '.', value: '.' },
      { number: '0', value: '0' },
      { number: '=', value: '=' },
    ];
    
    
    const getButtonBackgroundColor = ({item}) => {
      if (item.value === '=') {

        return { backgroundColor: '#ff9933' }; // Set the background color for "=" button
      }

      return {}; // Return empty object for other buttons 
    };
    const getTopButtonColor=({item})=>{
      if(['%','Clear','C', 'close'].includes(item.value))
        {
        return { backgroundColor: '#C4741F' };
      }
      return{}
    }
    const topside = ({item}) => {
      if (['x^2', '2root x', 'sqrt', 'X', '/', '-', '+'].includes(item.value)) {

        return { backgroundColor: '#D64333' };
      }
      return {}; // Return empty object for other buttons 
    };
    
        const renderNumber = ({ item }) => (
          <TouchableOpacity style={[styles.numberButton, getButtonBackgroundColor({ item }),topside({item}), getTopButtonColor({ item })]} onPress={() => pressed(item.value)}>
          <Text style={styles.numberText}>{item.number}</Text>
        </TouchableOpacity>
        );
      
        return (
          <> 
          <View style={styles.container}>
            <Text style={styles.result}>{result}</Text>
            <Text style={{position:"absolute",top:-100,fontSize:39,margin:15}}>{solved}</Text>
            <FlatList
              data={NUMBERS}
              numColumns={4}
              renderItem={renderNumber}
              keyExtractor={(item) => item.number}
              contentContainerStyle={styles.numberGrid}
            />
          </View>
          <Text style={{position:'absolute', bottom:0,textAlign:'center'}}>Developed And Maintained By Srujan T J</Text>

          </>
        );
      };
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position:'absolute',
      bottom:80,
      
    },
    numberGrid: {
        alignItems: 'center',
      },
    numberButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
      height: 80,
      margin: 5,
    
      backgroundColor: '#e3e3e3',
      borderRadius: 10,
    },
    numberText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
    },
    result:{
        fontSize:30,
        color:'black',
        textAlign:'center',
        backgroundColor:'#61626F',
        width:400,
        height:70
    }
  });
