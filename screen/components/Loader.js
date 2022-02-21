import React from 'react'
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native'

const Loader = (props) => {
    const { loading, ...attributes } = props;

    return (
        <View style={styles.container}>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Loader;