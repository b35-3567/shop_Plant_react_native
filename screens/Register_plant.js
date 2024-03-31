import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckboxCircle from './CheckboxCircle';
import LinearGradient from 'react-native-linear-gradient';
// Trong file muốn sử dụng biến API
import { API } from '../API_TRUE';
const Register_plant = (props) => {
    const { navigation } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused1, setIsFocused1] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setphoneError] = useState('');
    // Thêm state mới để theo dõi trạng thái hiển thị mật khẩu
    const [showPassword, setShowPassword] = useState(false);
    console.log('API', API);
    // Hàm xử lý sự kiện nhấn nút hiển thị/ẩn mật khẩu
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleFocus3 = () => {
        setIsFocused3(true);
    }

    const handleBlur3 = () => {
        setIsFocused3(false);
    }
    const handleFocus2 = () => {
        setIsFocused2(true);
    }

    const handleBlur2 = () => {
        setIsFocused2(false);
    }
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

    const handleLogin = async (navigation) => {
        // Xóa thông báo lỗi trước khi kiểm tra lại
        setEmailError('');
        setPasswordError('');
        setNameError('');
        setphoneError('');
        // Kiểm tra nếu email hoặc password trống
        if (!name.trim()) {
            setNameError('Vui lòng nhập name');
            return;
        }
        if (!email.trim()) {
            setEmailError('Vui lòng nhập email');
            return;
        }
        if (!phone.trim()) {
            setphoneError('Vui lòng nhập số điện thoại:');
            return;
        }
        if (!password.trim()) {
            setPasswordError('Vui lòng nhập mật khẩu');
            return;
        }
        try {
         
            const response = await fetch(`http://${API}:3000/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    phone
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Xử lý thành công
                console.log('Đăng ký thành công');
                // Chuyển hướng hoặc thực hiện các hành động khác ở đây
                // Tiến hành xử lý đăng nhập
                navigation.navigate('login');
            } else {
                // Xử lý lỗi
                console.error('Đăng ký không thành công:', data.message);
                // Hiển thị thông báo lỗi cho người dùng
            }
        } catch (error) {
            console.error('Lỗi:', error);
            // Xử lý lỗi mạng hoặc lỗi khác
            // Hiển thị thông báo lỗi cho người dùng
        }

    }

    return (
        <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }>
            <ScrollView>
                <View style={ styles.container }>
                    <Image source={ require('../../../assets/Ellipse1.png') } style={ styles.ImageL } />
                    <Text style={ { color: '#000', fontSize: 30, fontStyle: 'normal', fontWeight: 'bold', } }>ĐĂNG KÝ</Text>
                    <Text style={ { marginBottom: 20, color: '#000', fontSize: 18, fontStyle: 'normal', fontWeight: '400' } }>Tạo tài khoản</Text>



                    <TextInput
                        style={ [styles.input1, isFocused2 ? styles.inputFocused : null] }
                        onFocus={ handleFocus2 }
                        onBlur={ handleBlur2 }
                        placeholder="Name"
                        onChangeText={ (text) => setName(text) }
                    />
                    { nameError ? <Text style={ styles.error }>{ nameError }</Text> : null }


                    <TextInput
                        style={ [styles.input1, isFocused1 ? styles.inputFocused : null] }
                        onFocus={ handleFocus1 }
                        onBlur={ handleBlur1 }
                        placeholder="Email"
                        onChangeText={ (text) => setEmail(text) }
                    />
                    { emailError ? <Text style={ styles.error }>{ emailError }</Text> : null }


                    <TextInput
                        style={ [styles.input1, isFocused3 ? styles.inputFocused : null] }
                        onFocus={ handleFocus3 }
                        onBlur={ handleBlur3 }
                        placeholder="số điện thoại"
                        onChangeText={ (text) => setPhone(text) }
                    />
                    { phoneError ? <Text style={ styles.error }>{ phoneError }</Text> : null }

                    <View style={ [styles.inputContainer, isFocused ? styles.inputFocused : null] }>
                        <TextInput
                            style={ [styles.input, styles.inputPassword] }
                            onFocus={ handleFocus }
                            onBlur={ handleBlur }
                            placeholder="Password"
                            secureTextEntry={ !showPassword }
                            onChangeText={ (text) => setPassword(text) }
                        />

                        <TouchableOpacity onPress={ toggleShowPassword } style={ { position: 'absolute', right: 10, top: 10 } }>
                            <Icon name={ showPassword ? 'eye-slash' : 'eye' } size={ 20 } color="gray" />
                        </TouchableOpacity>
                    </View>
                    { passwordError ? <Text style={ styles.error }>{ passwordError }</Text> : null }
                    {/*        */ }
                    <View style={ { flexDirection: 'row', marginLeft: -13 } }>
                        <Text style={ { fontSize: 16, fontStyle: 'normal', fontWeight: '500' } }>Để đăng ký tài khoản, bạn đồng ý </Text>
                        <Text style={ { fontSize: 16, fontStyle: 'normal', fontWeight: '500', color: '#009245', textDecorationLine: 'underline' } }> Terms &</Text>
                    </View>
                    <View style={ { flexDirection: 'row', marginLeft: -13 } }>
                        <Text style={ { fontSize: 16, fontStyle: 'normal', fontWeight: '500', color: '#009245', textDecorationLine: 'underline' } }> Conditions</Text>
                        <Text style={ { fontSize: 16, fontStyle: 'normal', fontWeight: '500', } }> and</Text>
                        <Text style={ { fontSize: 16, fontStyle: 'normal', fontWeight: '500', color: '#009245', textDecorationLine: 'underline' } }> Privacy Policy</Text>
                    </View>
                    <LinearGradient colors={ ['#007537', '#4CAF50'] }
                        start={ { x: 0, y: 0 } }
                        end={ { x: 1, y: 0 } }
                        locations={ [0, 1] } style={ { marginTop: 25, borderRadius: 15, width: 350, height: 50, alignItems: 'center', textAlign: 'center', justifyContent: 'center', } }>
                        <TouchableOpacity onPress={ () => handleLogin(navigation) } style={ {} }>
                            <Text style={ { backgroundColor: '#009245', fontSize: 20, fontStyle: 'normal', fontWeight: '500', color: 'white' } }>Đăng ký</Text>
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
                    <View style={ { flexDirection: 'row', marginTop: 5 } }>
                        <Text style={ { fontSize: 16, fontStyle: 'normal', fontWeight: '500', } }>Tôi đã có tài khoản</Text>
                        <Text style={ { fontSize: 16, fontStyle: 'normal', fontWeight: '500', color: '#009245', textDecorationLine: 'underline' } }
                         onPress={()=>navigation.navigate('login')}> Đăng nhập</Text>
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
        marginBottom: 19,
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
        marginTop: -300
    },
    error: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
        marginTop: -12,
        marginLeft: -200
    },
});


export default Register_plant