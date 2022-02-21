import React from 'react'
import { View, StatusBar } from 'react-native'
import { COLORS } from '../../constaints'

const MainLayout = ({ children }) => {
    return (
        <View
            style={{
                flex: 1
            }}
        >
            <StatusBar />
            {children}
        </View>
    )
}

export default MainLayout;