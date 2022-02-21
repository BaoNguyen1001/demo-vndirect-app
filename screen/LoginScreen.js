import React, { createRef, useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    TextInput,
    Alert
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from '../config/firebase'

import Loader from './components/Loader'

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errortext, setErrortext] = useState('')
    const [hidePassword, setHidePassword] = useState(true)
    const passwordInputRef = createRef();

    const errors = {
        requireInput: 'Vui lòng nhập đầy đủ email và mật khẩu',
        wrong: 'Email hoặc mật khẩu chưa chính xác'
    }

    const handleSubmitPress = async () => {

        setErrortext('');
        if (!email || !password) {
            setErrortext(errors.requireInput)

        } else {
            await firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => user.user)
                .then((user) => {
                    AsyncStorage.setItem('user_id', user.uid)
                    navigation.replace('Tabs')
                })
                .catch((error) => {
                    console.log(error);
                    setErrortext('')
                    Alert.alert('VNDIRECT-khối KHCN Miền Nam', errors.wrong)
                })
        }
    }


    return (
        <View style={styles.container}>
            {/* <Loader loading={loading}/> */}
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
            >
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../assets/image/logo.png')}
                                style={styles.imageStyle}
                            />
                        </View>
                        <View style={styles.sectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder='Enter Email'
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize='none'
                                keyboardType='email-address'
                                returnKeyType='next'
                                onChangeText={(email) => setEmail(email)}
                                onSubmitEditing={() => {
                                    passwordInputRef.current &&
                                        passwordInputRef.current.focus()
                                }}
                                blurOnSubmit={false}
                                value={email}
                            />
                        </View>
                        <View style={styles.sectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(password) =>
                                    setPassword(password)
                                }
                                placeholder="Enter Password"
                                placeholderTextColor="#8b9cb5"
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={hidePassword}
                                returnKeyType="next"
                                value={password}
                            />
                            {
                                password.length > 0 ?
                                    <Icon
                                        style={styles.icon}
                                        name={hidePassword ? 'eye-slash' : 'eye'}
                                        size={15}
                                        color="grey"
                                        onPress={() => setHidePassword(!hidePassword)}
                                    />
                                    : null
                            }
                        </View>
                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>{errortext}</Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitPress}
                        >
                            <Text style={styles.buttonTextStyle}>Login</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => navigation.navigate('RegisterScreen')}>
                            Sign up
                        </Text>
                        <Text
                            style={styles.forgotPasswordStyle}
                        //onPress={() => navigation.navigate('RegisterScreen')}
                        >
                            Forgot password?
                        </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',

    },
    imageStyle: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    sectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 5,
        paddingHorizontal: 35
    },
    inputStyle: {
        flex: 1,
        color: '#000',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 5
    },
    buttonStyle: {
        backgroundColor: '#f7941e',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#f7941e',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        marginBottom: 0,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16
    },
    registerTextStyle: {
        color: '#8b9cb5',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        paddingTop: 10,
        textDecorationLine: 'underline'
    },
    forgotPasswordStyle: {
        color: '#8b9cb5',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 5,
        textDecorationLine: 'underline'
    },
    icon: {
        position: 'absolute',
        top: 12,
        right: 50
    },

})

export default LoginScreen;

