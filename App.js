import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Switch, ScrollView } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState(false); 

  const handlePress = (value) => setInput((prev) => prev + value); // cb tema
  

  const calculateResult = () => { //r e
    try {
      setInput(String(eval(input))); // eo
    } catch {
      setInput('Error');
    }
  };

  const clearInput = () => setInput('');

  const toggleTheme = () => setTheme((prev) => !prev); //tm

  const buttons = [
    ['AC', '(', ')', '/'],
    ['π', 'e', '^', '*'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '√'],
    ['0', '.', '±', '='],
    ['sin', 'cos', 'tan', 'log'],
    ['asin', 'acos', 'atan', 'ln'],
  ];

  return (
    <View style={[styles.container, theme && styles.darkContainer]}>
      <StatusBar style="auto" />
      <Switch value={theme} onValueChange={toggleTheme} />
      <TextInput
        style={[styles.input, theme && styles.darkInput]}
        value={input}
        editable={false}
        placeholder="0"
        placeholderTextColor={theme ? '#888' : '#aaa'}
      />
      <ScrollView contentContainerStyle={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <Button
                key={item}
                label={item}
                onPress={() => {
                  if (item === 'AC') {
                    clearInput();
                  } else if (item === '=') {
                    calculateResult();
                  } else if (item === 'π') {
                    handlePress(String(Math.PI));
                  } else if (item === 'e') {
                    handlePress(String(Math.E));
                  } else if (item === '√') {
                    handlePress('Math.sqrt(');
                  } else if (item === '^') {
                    handlePress('**');
                  } else if (item === '±') {
                    handlePress('-');
                  } else {
                    handlePress(`${item}(`);
                  }
                }}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Propiedades para los botones
const Button = ({ label, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 24,
    textAlign: 'right',
    paddingHorizontal: 10,
  },
  darkInput: {
    backgroundColor: '#333',
    color: '#fff',
  },
  buttonsContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: '23%',
    backgroundColor: '#1e90ff',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
