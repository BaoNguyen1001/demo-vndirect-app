import React, { useState, createRef, useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';

import { useValidation } from 'react-native-form-validator'
import Icon from 'react-native-vector-icons/FontAwesome';

import Loader from './components/Loader';
import firebase from '../config/firebase'
import IconError from './components/IconError';
import ErrorText from './components/ErrorText';

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errortext, setErrortext] = useState('')
    const [loading, setLoading] = useState(false)
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true)


    const emailInputRef = createRef();
    const passwordInputRef = createRef();
    const confirmPasswordInputRef = createRef();



    const { validate, isFieldInError, getErrorsInField, getErrorMessages } = useValidation({
        state: { name, email, password, confirmPassword }
    })


    const handleRegisterPress = async () => {
        var user_id = '';

        const isValidate = validate({
            name: { required: true },
            email: { required: true },
            password: { required: true },
            confirmPassword: { required: true }
        });
        if (!isValidate) {
            Alert.alert(
                'VNDIRECT',
                'Nhap day du thong tin'
            )
        } else {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    user_id = response.user.uid
                    firebase.database().ref('users/' + user_id)
                        .set({
                            name: name,
                            email: email,
                            password: password
                        })
                })
                .catch((error) => {
                    console.log(error)
                })

        }

    }

    return (
        <View style={styles.container}>
            {/* <Loader/> */}
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
            >
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>SIGN UP</Text>
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.sectionStyle}>
                        <TextInput style={isFieldInError('name') ? styles.inputStyleError : styles.inputStyle}
                            placeholder='Enter your name'
                            placeholderTextColor='#8b9cb5'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            onChangeText={(name) => {
                                setName(name)

                            }}
                            onSubmitEditing={() => {
                                emailInputRef.current &&
                                    emailInputRef.current.focus()
                            }}
                            blurOnSubmit={false}
                            value={name}
                        />
                        <IconError error={getErrorsInField('name')} />
                    </View>
                    <ErrorText isFieldInError={isFieldInError('name')} />
                    <View style={styles.sectionStyle}>
                        <TextInput style={isFieldInError('email') ? styles.inputStyleError : styles.inputStyle}
                            placeholder='Enter email'
                            placeholderTextColor='#8b9cb5'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            returnKeyType='next'
                            ref={emailInputRef}
                            onChangeText={(email) => {
                                setEmail(email)
                                validate({
                                    email: { email: true }
                                })
                            }}
                            onSubmitEditing={() => {
                                passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                            }}
                            blurOnSubmit={false}
                            value={email}
                        />
                        <IconError error={getErrorsInField('email')} />
                    </View>
                    <ErrorText isFieldInError={isFieldInError('email')} />
                    <View style={styles.sectionStyle}>
                        <View style={styles.passwordInputStyle}>
                            <TextInput style={isFieldInError('password') ? styles.inputStyleError : styles.inputStyle}
                                placeholder='Enter password'
                                placeholderTextColor='#8b9cb5'
                                autoCapitalize='sentences'
                                returnKeyType='next'
                                keyboardType="default"
                                ref={passwordInputRef}
                                secureTextEntry={hidePassword}
                                onChangeText={(password) => {
                                    setPassword(password)
                                    validate({
                                        password: { minlength: 6, maxlength: 18 }
                                    })
                                }}
                                onSubmitEditing={() => {
                                    confirmPasswordInputRef.current &&
                                        confirmPasswordInputRef.current.focus()
                                }}
                                blurOnSubmit={false}
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

                        <IconError error={getErrorsInField('password')} />
                    </View>
                    <ErrorText isFieldInError={isFieldInError('password')} />
                    <View style={styles.sectionStyle}>
                        <View style={styles.passwordInputStyle}>
                            <TextInput style={isFieldInError('confirmPassword') ? styles.inputStyleError : styles.inputStyle}
                                placeholder='Enter password again'
                                placeholderTextColor='#8b9cb5'
                                autoCapitalize='sentences'
                                returnKeyType='next'
                                keyboardType="default"
                                ref={confirmPasswordInputRef}
                                secureTextEntry={hideConfirmPassword}
                                onChangeText={(confirmPassword) => {
                                    setConfirmPassword(confirmPassword)
                                    validate({
                                        confirmPassword: { equalPassword: password }
                                    })
                                }}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                value={confirmPassword}
                            />
                            {
                                confirmPassword.length > 0 ?
                                    <Icon
                                        style={styles.icon}
                                        name={hideConfirmPassword ? 'eye-slash' : 'eye'}
                                        size={15}
                                        color="grey"
                                        onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                                    />
                                    : null
                            }
                        </View>

                        <IconError error={getErrorsInField('confirmPassword')} />
                    </View>
                    <ErrorText isFieldInError={isFieldInError('confirmPassword')} />
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleRegisterPress}
                    >
                        <Text style={styles.buttonTextStyle}>Register</Text>
                    </TouchableOpacity>
                    <View style={{ alignContent: 'center', flexDirection: 'row', justifyContent: 'center', paddingTop: 5 }}>
                        <Text >Đã có tài khoản </Text>

                        <Text
                            style={styles.loginStyle}
                            onPress={() => navigation.navigate('LoginScreen')}>
                            Sign in
                        </Text>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: '700'
    },
    sectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 5,
        paddingHorizontal: 20
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
    inputStyleError: {
        flex: 1,
        color: '#000',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'red',
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
    loginStyle: {
        color: '#8b9cb5',
        fontWeight: 'bold',
        fontSize: 14,
        textDecorationLine: 'underline'
    },
    icon: {
        position: 'absolute',
        top: 12,
        right: 12
    },
    passwordInputStyle: {
        flex: 1,
        flexDirection: 'row'
    }
})

export default RegisterScreen;

