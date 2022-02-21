import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';


const ErrorText = (props) => {
    const isFieldInError = props.isFieldInError
    return (
        isFieldInError ?
            <View>
                <Text style={styles.textErrorStyle}>Custom error text </Text>
            </View> : null
    )
}

const styles = StyleSheet.create({
    textErrorStyle: {
        fontSize: 12,
        color: 'red',
        paddingLeft: 35,
        marginVertical: 3
    }
})

export default ErrorText