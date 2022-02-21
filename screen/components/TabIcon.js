import React from "react";
import { View, Text, Image } from 'react-native'
import { COLORS, icons } from '../../constaints'

const TabIcon = ({ focused, icon, iconStyle, label, isTrade }) => {

        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? COLORS.black : COLORS.black,
                        ...iconStyle
                    }}
                />

                {/* <Text
                    style={{
                        color: focused ? COLORS.black : COLORS.black,
                        fontSize: 10, lineHeight: 22
                    }}
                >
                    {label}
                </Text> */}
            </View>
        )

}

export default TabIcon;