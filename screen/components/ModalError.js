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

const ModalError = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
    const error = props.error;

    const handleShowModalError = () => {
        setModalVisible(true)
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    const ShowError = () => {
        return (
            modalVisible ?
                <View>
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={handleCloseModal}
                    >
                        <TouchableOpacity
                            style={styles.modalContainer}
                            activeOpacity={1}
                            onPressOut={handleCloseModal}
                        >
                            <ScrollView
                                directionalLockEnabled={true}
                                contentContainerStyle={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignContent: 'center'
                                }}
                            >
                                <TouchableWithoutFeedback>
                                    <View style={styles.modalContent}>

                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                        </TouchableOpacity>

                    </Modal>
                </View>
                : null
        )
    }


    return (
        error.length > 0 ?
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={handleShowModalError}
                >
                    <Image style={styles.image} source={require('../../assets/icons/info.png')} />
                </TouchableOpacity>
                <ShowError />
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
    },
    modalContainer: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {

    }

})

export default ModalError;