import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'

const EmptyContainer = ({ title }: any) => {
    return (
        <View style={styles.EmptyCartContainer}>

            <Text style={styles.LottieText}>{title}</Text>
        </View>
    )
}

export default EmptyContainer


const styles = StyleSheet.create({
    EmptyCartContainer: {
        justifyContent: 'center',
        //alignItems: 'center',
    },
    LottieStyle: {
        height: 300,
    },
    LottieText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
        // marginTop: 20,
        textAlign: 'center',
    },
});