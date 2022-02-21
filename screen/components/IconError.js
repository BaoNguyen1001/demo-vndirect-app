import react, { useState, useEffect } from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    Modal,
    ScrollView
} from 'react-native'

const IconError = (props) => {
    const error = props.error;
    return (
        error.length > 0 ?
            <View style={styles.container}>
                <Image style={styles.image} source={require('../../assets/icons/info.png')} />
            </View> : null
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        justifyContent: "center",
        marginLeft: 10
    },
    image: {
        width: 15,
        height: 15,
        resizeMode: "contain"
    }
})

export default IconError;