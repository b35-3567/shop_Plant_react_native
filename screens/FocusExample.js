import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckboxCircle from './CheckboxCircle';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import { useDispatch } from 'react-redux';
import { saveUserInfo } from '../../API_Redux/userActions';//userActions'
import { API } from '../API_TRUE';
import axios from 'axios';

const FocusExample = (props) => {
    const { navigation } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused1, setIsFocused1] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const dispatch = useDispatch();
    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleBlur = () => {
        setIsFocused(false);
    }

    const handleFocus1 = () => {
        setIsFocused1(true);
    }

    const handleBlur1 = () => {
        setIsFocused1(false);
    }

    const handleCheckChange = () => {
        setIsChecked(!isChecked);
    }
    console.log('API login', API);
    const handleLogin = async (navigation) => {
        // Xóa thông báo lỗi trước khi kiểm tra lại
        setEmailError('');
        setPasswordError('');

        // Kiểm tra nếu email hoặc password trống
        if (!email.trim()) {
            setEmailError('Vui lòng nhập email');
            return;
        }
        if (!password.trim()) {
            setPasswordError('Vui lòng nhập mật khẩu');
            return;
        }
      
       
                try {
                    const response = await axios.post(`http://${API}:3000/login`, {
                        email: email,
                        password: password
                    });
        
                    const userInfo = response.data;
        
                    dispatch(saveUserInfo(userInfo));
                       navigation.navigate('MainTabNavigation');
                } catch (error) {
                    console.error('Đã xảy ra lỗi khi đăng nhập:', JSON.stringify(error));
                }
        
        
                
    }






    return (
        <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }>
            <ScrollView>
                <View style={ styles.container }>
                    <Image source={ require('../../../assets/Ellipse1.png') } style={ styles.ImageL } />
                    <Text style={ { color: '#000', fontSize: 30, fontStyle: 'normal', fontWeight: 'bold', } }>Chào mừng bạn</Text>
                    <Text style={ { marginBottom: 20, color: '#000', fontSize: 18, fontStyle: 'normal', fontWeight: '400' } }>Đăng nhập tài khoản</Text>
                    <TextInput
                        style={ [styles.input1, isFocused1 ? styles.inputFocused : null] }
                        onFocus={ handleFocus1 }
                        onBlur={ handleBlur1 }
                        placeholder="Email"
                        onChangeText={ (text) => setEmail(text) }
                    />
                    { emailError ? <Text style={ styles.error }>{ emailError }</Text> : null }
                    <View style={ [styles.inputContainer, isFocused ? styles.inputFocused : null] }>
                        <TextInput
                            style={ styles.input }
                            onFocus={ handleFocus }
                            onBlur={ handleBlur }
                            placeholder="Password"
                            secureTextEntry={ true }
                            onChangeText={ (text) => setPassword(text) }
                        />
                        <TouchableOpacity>
                            <Icon name="eye" size={ 30 } color="black" style={ styles.icon } />
                        </TouchableOpacity>
                    </View>
                    { passwordError ? <Text style={ styles.error }>{ passwordError }</Text> : null }
                    <View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '85%' } }>
                        <CheckboxCircle label="Nhớ tài khoản" checked={ isChecked } onChange={ handleCheckChange } />
                        <Text style={ { color: '#009245' } }>Quên mật khẩu?</Text>
                    </View>
                    <LinearGradient colors={ ['#007537', '#4CAF50'] }
                        start={ { x: 0, y: 0 } }
                        end={ { x: 1, y: 0 } }
                        locations={ [0, 1] } style={ { marginTop: 25, borderRadius: 15, width: 350, height: 50, alignItems: 'center', textAlign: 'center', justifyContent: 'center', } }>
                        <TouchableOpacity onPress={ () => handleLogin(navigation) } style={ {} }>
                            <Text style={ { backgroundColor: '#009245', fontSize: 20, fontStyle: 'normal', fontWeight: '500', color: 'white' } }>Đăng nhập</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={ { flexDirection: 'row', alignItems: 'center', marginTop: 30, justifyContent: 'space-around', width: '90%' } }>
                        <View style={ { backgroundColor: '#4CAF50', width: 120, height: 2, } }></View>
                        <Text>Hoặc</Text>
                        <View style={ { backgroundColor: '#4CAF50', width: 120, height: 2 } }></View>
                    </View>
                    <View style={ { flexDirection: 'row', marginTop: 24 } }>
                        <Image
                            source={ require('../../../assets/logo_gg.png') }
                            style={ { width: 40, height: 40 } } // Đặt chiều rộng và chiều cao của hình ảnh
                        />
                        <Image
                            source={ require('../../../assets/Facebook_Logo.webp') }
                            style={ { width: 40, height: 40, marginLeft: 23 } } // Đặt chiều rộng và chiều cao của hình ảnh
                        />
                    </View>
                    <View style={ { flexDirection: 'row', marginTop: 12 } }>
                        <Text style={ { fontSize: 16, fontStyle: 'normal', fontWeight: '500', } }>Tôi không có tài khoản</Text>
                        <Text style={ { fontSize: 16, fontStyle: 'normal', fontWeight: '500', color: '#009245', textDecorationLine: 'underline' } }> Đăng ký</Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 350,
        height: 46,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: 'gray',
    },
    input: {
        flex: 1,
        padding: 10,
    },
    input1: {
        width: 350,
        padding: 10,
        height: 46,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: 'gray',
    },
    inputFocused: {
        borderColor: '#009245',
    },
    icon: {
        marginRight: 15
    },
    ImageL: {
        width: '100%',
        height: 487,
        borderTopRightRadius: 20,
        marginTop: -180
    },
    error: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
});

export default FocusExample;
