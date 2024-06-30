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
        backgroundColor: "gold",
        padding: 2,
        borderRadius: 20,
        color: COLORS.primaryBlackHex,
        fontWeight: 'bold',
        width: 22,
        height: 22,
        textAlign: 'center',
        overflow: 'hidden',
        fontSize: 12,
    },
});
