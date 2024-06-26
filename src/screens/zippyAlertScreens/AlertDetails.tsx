import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { generalStyles } from '../utils/generatStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLORS } from '../../theme/theme'

const AlertDetails = () => {
    const { data } = useRoute<any>()?.params


    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            {/* details */}
            <View style={styles.cardContainer}>
                <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />

                <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]}>
                    <View>
                        <Text style={generalStyles.CardTitle} >Title</Text>
                        <Text style={generalStyles.CardSubtitle}>{data?.title}</Text>
                    </View>
                    <View>
                        <Text style={generalStyles.CardTitle} >Category</Text>
                        <Text style={generalStyles.CardSubtitle}>{data?.category?.name}</Text>

                    </View>

                </View>

                <View >
                    <View>
                        <Text style={generalStyles.CardTitle} >Total Bedrooms</Text>
                        <Text style={generalStyles.CardSubtitle}>{data?.number_of_bedrooms}</Text>
                    </View>
                    <View>
                        <Text style={generalStyles.CardTitle} >Total Bathrooms</Text>
                        <Text style={generalStyles.CardSubtitle}>{data?.number_bathrooms}</Text>
                    </View>

                </View>
                <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />

            </View>
            {/* details */}
        </KeyboardAwareScrollView>
    )
}

export default AlertDetails

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 10,
        padding: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        margin: 5,
        // marginHorizontal: 5
    },
    hairLineStyles: {
        width: "80%",
        // marginHorizontal: 40,
        marginVertical: 10
    },
})