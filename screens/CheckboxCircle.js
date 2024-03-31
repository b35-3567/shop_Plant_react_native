import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CheckboxCircle = ({ label, checked, onChange }) => {

    return (
        <TouchableOpacity style={styles.checkbox} onPress={onChange}>
        <View style={styles.checkboxContainer}>
          <Icon name={checked ? 'check-circle' : 'check-circle'} size={34} color={checked ? '#009245' : 'gray'} />
        </View>
        <Text>{label}</Text>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxContainer: {
        marginRight: 8,
    },
});
export default CheckboxCircle;
