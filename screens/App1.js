import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CheckBox = ({ label, checked, onChange }) => {
    return (
      <TouchableOpacity style={styles.checkbox} onPress={onChange}>
        <View style={styles.checkboxContainer}>
          <Icon name={checked ? 'check-circle' : 'check-circle'} size={34} color={checked ? '#009245' : 'gray'} />
        </View>
        <Text>{label}</Text>
      </TouchableOpacity>
    );
  };

const App1 = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckChange = () => {
      setIsChecked(!isChecked);
    };

    return (
        <View style={ styles.container }>
            <CheckBox label="Checkbox 1" checked={ isChecked } onChange={ handleCheckChange } />
            <View style={ { flexDirection: 'row',alignItems:'center' } }>
            <Icon name="check-circle" size={ 34 } color="gray" />
                <Text>chưa chọn</Text>
            </View>
            <Icon name="check-circle" size={ 34 } color="#009245" />
            <Icon name="check-circle" size={ 34 } color="gray" />
            <CheckBox label="Checkbox" checked={isChecked} onChange={handleCheckChange} />
        </View>
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

export default App1;
