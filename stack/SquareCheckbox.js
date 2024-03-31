import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SquareCheckbox = () => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox} style={styles.checkboxContainer}>
      {checked ? <Icon name="check-square-o" size={30} color="green" /> : <Icon name="square-o" size={30} color="black" />}
      <Text style={styles.checkboxLabel}>Checkbox Label</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default SquareCheckbox;
