import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { generalStyles } from '../screens/utils/generatStyles'
import { COLORS, FONTSIZE } from '../theme/theme'
import { useNavigation } from '@react-navigation/native'

const CategoryTypes = ({ text, screen }: any) => {

    const navigation = useNavigation<any>();

    return (
        <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between", marginHorizontal: 10 }]}>
            <View>
                <Text style={[generalStyles.CardTitle]}>{text}</Text>
            </View>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate(screen)}
            >
                <Text style={[generalStyles.CardSubtitle, { color: COLORS.primaryOrangeHex, fontSize: FONTSIZE.size_10 }]}>View All</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CategoryTypes

