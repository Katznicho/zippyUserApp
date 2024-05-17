import { TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const ArrowBack = () => {
    const navigation = useNavigation<any>();
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10 }}
        >
            <Entypo
                name="chevron-left"
                color={COLORS.primaryBlackHex}
                size={28}
            />
        </TouchableOpacity>
    )
}

export default ArrowBack

