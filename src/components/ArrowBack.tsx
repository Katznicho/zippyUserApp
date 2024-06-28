import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/theme';

const ArrowBack = ({ styles, color, size=28 }: any) => {
    const navigation = useNavigation<any>()
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.goBack()}
            style={[{ marginLeft: 10 }, styles]}
        >
            <Entypo
                name="chevron-left"
                color={color? COLORS.primaryOrangeHex:COLORS.primaryBlackHex}
                size={size}
            />
        </TouchableOpacity>
    )
}

export default ArrowBack

