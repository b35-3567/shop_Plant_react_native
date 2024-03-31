import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const CustomTextInput = () => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [isFocused1, setIsFocused1] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const borderColor = '#009245'; // Màu cho đường viền

    const handleFocus1 = () => {
        setIsFocused1(true);
    }

    const handleBlur1 = () => {
        setIsFocused1(false);
    }

    const handleFocus2 = () => {
        setIsFocused2(true);
    }

    const handleBlur2 = () => {
        setIsFocused2(false);
    }

    const handleChangeText1 = (value) => {
        setText1(value);
    }

    const handleChangeText2 = (value) => {
        setText2(value);
    }

    const getBorderColor1 = () => {
        return isFocused1 && text1.length === 0 ? borderColor : 'gray'; // Sử dụng màu borderColor chỉ khi đang focus và không có dữ liệu nhập vào
    }

    const getBorderColor2 = () => {
        return isFocused2 && text2.length === 0 ? borderColor : 'gray'; // Sử dụng màu borderColor chỉ khi đang focus và không có dữ liệu nhập vào
    }

    return (
        <View>
            <View style={[
                styles.container,
                { borderColor: getBorderColor1() },
                isFocused1 ? styles.focused : null,
            ]}>
                <TextInput
                    style={styles.input}
                    onFocus={handleFocus1}
                    onBlur={handleBlur1}
                    onChangeText={handleChangeText1}
                />
            </View>
            <View style={[
                styles.container,
                { borderColor: getBorderColor2() },
                isFocused2 ? styles.focused : null,
            ]}>
                <TextInput
                    style={styles.input}
                    onFocus={handleFocus2}
                    onBlur={handleBlur2}
                    onChangeText={handleChangeText2}
                />
            </View>
        </View>
    );
}
  

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
        borderColor: 'gray', // Màu mặc định cho đường viền
        marginTop:20
    },
    input: {
        padding: 10,
    },
    focused: {
        borderColor: '#009245', // Màu khi focus
    },
});

export default CustomTextInput;
