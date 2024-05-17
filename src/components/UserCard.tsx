import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import { generalStyles } from '../screens/utils/generatStyles';
import { useNavigation } from '@react-navigation/native';
import { formattedDate } from '../screens/utils/helpers/helpers';

const UserCard: React.FC<any> = ({ item }: any) => {

    const navigation = useNavigation<any>()
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.cardContainer]}
        >
            <View style={[generalStyles.flexStyles, { justifyContent: 'space-between' }]}>
                <View>
                    {/* location */}
                    <View>
                        <Text style={styles.CardTitle}>{item?.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.CardSubtitle}> {item?.email}</Text>
                    </View>
                    {/* location */}
                </View>

                <View>
                    <View>
                        <Text style={styles.CardPriceCurrency}> {item?.phone_number}</Text>
                        <Text style={styles.CardPriceCurrency}> {formattedDate(item?.created_at)}</Text>

                    </View>


                </View>

            </View>

            <TouchableOpacity
                activeOpacity={1}
                style={[generalStyles.loginContainer,
                styles.buttonStyles,
                ]}
                onPress={() => navigation.navigate('UserDetails', { item })}

            >
                <Text style={generalStyles.loginText}>{'View More'}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default UserCard

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
        margin: 10,
        // marginHorizontal: 5
    },
    CardTitle: {
        fontFamily: FONTFAMILY.roboto_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.roboto_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
        // marginHorizontal: SPACING.space_10
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.roboto_bold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_12,
    },
    spacingStyles: {
        marginHorizontal: 5,
        marginVertical: 5
    },
    buttonStyles: {
        width: "80%",
        marginTop: 5,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 10,
        padding: 5
    },
    ImageInfoOuterContainer: {
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
        borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
    },

})