import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const FrT = ({ placeholder }) => {
  return (
    <View style={ styles.inputContainer }>
    <TextInput
        style={ styles.input }
        placeholder={ 'hh' }
        placeholderTextColor="black"
    />
</View>
  )
}
const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 48,
        marginBottom: 15,
    },
    input: {
        width: 299,
        height: 42,
        borderBottomWidth: 1,
        borderBottomColor: '#007537',
        fontSize: 18,
        color: 'black', // Text color
    },
});

export default FrT