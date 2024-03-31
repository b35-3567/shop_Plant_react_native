import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import AppTextInput2 from '../../commons/AppTextInput2';
import customStyles from '../../styles/customStyles';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const checkName = (value) => {
        setName(value);
        if (!value) {
            setNameError('Name is required');
        } else {
            setNameError('');
        }
    }

    const checkEmail = (value) => {
        setEmail(value);
        if (!value) {
            setEmailError('Email is required');
        } else {
            setEmailError('');
        }
    }

    const handleNameFocus = () => {
        setIsNameFocused(true);
    }

    const handleNameBlur = () => {
        setIsNameFocused(false);
    }

    const handleEmailFocus = () => {
        setIsEmailFocused(true);
    }

    const handleEmailBlur = () => {
        setIsEmailFocused(false);
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView>
                <View>
                    <Image source={require('../../../assets/Ellipse1.png')} style={styles.ImageL} />
                    <AppTextInput2
                        title="Enter your name:"
                        err={nameError}
                        styles={customStyles}
                        value={name}
                        onChangeText={checkName}
                        onFocus={handleNameFocus}
                        onBlur={handleNameBlur}
                        borderColor={isNameFocused ? '#009245' : 'gray'}
                    />
                    <AppTextInput2
                        title="Enter your email:"
                        err={emailError}
                        styles={customStyles}
                        value={email}
                        onChangeText={checkEmail}
                        onFocus={handleEmailFocus}
                        onBlur={handleEmailBlur}
                        borderColor={isEmailFocused ? '#009245' : 'gray'}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ImageL: {
        width: 482.314,
        height: 307.314
    }
});

export default Login;
