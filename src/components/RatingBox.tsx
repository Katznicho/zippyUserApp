import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { COLORS } from '../theme/theme';


interface boxInterface {
    rating: number | string | null;
}

export default function RatingBox({ rating }: boxInterface) {
    if (rating === null || rating === 0) {
        return null;
    }

    return <Text style={styles.sRating}>{rating}</Text>;
}

const styles = StyleSheet.create({
    sRating: {
        backgroundColor: COLORS.primaryOrangeHex,
        paddingHorizontal: 10,
        borderRadius: 4,
        color: COLORS.primaryBlackHex,
        fontWeight: 'bold',
        width: 40,
        height: 15,
        textAlign: 'center',
        overflow: 'hidden',
        fontSize: 12,
    },
});
