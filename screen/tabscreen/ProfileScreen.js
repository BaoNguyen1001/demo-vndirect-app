import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { COLORS, data } from '../../constaints'

import Ionicons from 'react-native-vector-icons/Ionicons';

const handleLogout = (props) => {
    Alert.alert(
        'Logout',
        'Are you sure? You want to logout?',
        [
            {
                text: 'Cancel',
                onPress: () => {
                    return null;
                },
            },
            {
                text: 'Confirm',
                onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                },
            },
        ],
        { cancelable: false },
    );
}
const ProfileScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: COLORS.primary,
                width: '100%',
                height: '16%',
            }}>
            </View>

            {/* Info profile */}
            <View style={styles.profileStyle}>
                <View style={styles.sectionProfile}>
                    <View style={{
                        flexDirection: 'column',
                        alignContent: "center",
                    }}>
                        <Image style={styles.avatar} source={require('../../assets/image/avatar.jpg')} />
                        <View style={{
                            width: 25,
                            height: 25,
                            backgroundColor: COLORS.primary,
                            borderRadius: 100,
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: 70,
                            marginTop: -15,
                            zindex: 100


                        }}>
                            <Ionicons name={'camera-outline'} size={15} color={'white'} />
                        </View>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.name}>Nguyen Trung Tin</Text>
                        <Text style={styles.email}>tinnt.bee@gmail.com</Text>
                    </View>
                </View>

                {/* Option */}
                <View style={styles.optionStyle}>
                    <TouchableOpacity style={styles.optionItem}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <Ionicons name="key-outline" size={20} color='black' />
                            <Text style={styles.optionItemContent}>Change Password</Text>
                        </View>
                        <View>
                            <Ionicons name="chevron-forward-outline" size={20} color='black' />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionItem}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <Ionicons name="person-outline" size={20} color='black' />
                            <Text style={styles.optionItemContent}>Change Information</Text>
                        </View>
                        <View>
                            <Ionicons name="chevron-forward-outline" size={20} color='black' />
                        </View>
                    </TouchableOpacity>
                    {/* Logout button */}
                    <View>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => {
                                handleLogout(props)
                            }}
                        >
                            <Text style={styles.buttonTextStyle}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

{/* < TouchableOpacity
    onPress={() => {
        //props.navigation.toggleDrawer();
        Alert.alert(
            'Logout',
            'Are you sure? You want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        AsyncStorage.clear();
                        props.navigation.replace('Auth');
                    },
                },
            ],
            { cancelable: false },
        );
    }}
>
    <Text>Logout</Text>
</TouchableOpacity > */}


export default ProfileScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        alignContent: "center",
    },

    profileStyle: {
        position: "absolute",
        left: '3%',
        right: '3%',
        top: '12%',
        bottom: '50%',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    sectionProfile: {
        flexDirection: "row",
    },
    avatar: {
        width: 110,
        height: 160,
        marginLeft: 26,
        marginTop: -28,
        borderRadius: 10
    },
    info: {
        flexDirection: 'column',
        alignContent: "center",
        padding: 15
    },
    name: {
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 5
    },
    email: {
        fontStyle: 'italic',
        fontSize: 12
    },
    optionStyle: {
        flexDirection: "column",
        flex: 1,
        padding: 25
    },
    optionItem: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 20
    },
    optionItemContent: {
        marginLeft: 10,
        fontSize: 15
    },
    buttonStyle: {
        backgroundColor: '#f7941e',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#f7941e',
        height: 35,
        alignItems: 'center',
        borderRadius: 12,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 7,
        fontSize: 16,
        fontWeight: '600'
    },
})

