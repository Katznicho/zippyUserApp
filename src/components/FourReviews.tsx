import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import { BASE_URL } from '../screens/utils/constants/routes';

type Props = { trainer_id: number };

export default function FourReviews({ trainer_id }: Props) {
    const [fourReviews, setFourReviews] = useState([]);

    const navigation = useNavigation<any>();

    //
    // Get trainer reviews
    // useEffect(() => {
    //     const headers = new Headers();
    //     headers.append('Accept', 'application/json');
    //     // headers.append('Authorization', `Bearer ${authToken}`);

    //     fetch(`${BASE_URL}/trainer/rating/${trainer_id}`, {
    //         headers,
    //     })
    //         .then(response => response.json())
    //         .then(result => {
    //             // console.log('\n\n\n\n Trainer reviews below:');
    //             // console.log(result?.reviews?.data?.[0]);

    //             if (result.response === 'success') {
    //                 setFourReviews(result?.reviews?.data);
    //                 // setAvgRating(result?.average_rating);
    //             }
    //         })
    //         .catch(error => {
    //             console.log('\n\n\n\nError getting trainer reviews');
    //             console.log(error);
    //         });
    // }, [trainer_id]);

    //
    //
    return (
        <View style={styles.parent}>
            {fourReviews?.length > 0 && (
                <View style={styles.container}>
                    <View style={styles.peopleRow}>
                        {fourReviews.slice(0, 4).map((rev, index) => (
                            <View key={index}>
                                {index === 3 ? (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.fourPlusContainer}
                                        onPress={() =>
                                            navigation.navigate(
                                                'TrainerReviewsScreen',
                                                {
                                                    trainer_id,
                                                },
                                            )
                                        }
                                    >
                                        <Text style={styles.fourPlusText}>
                                            4+
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <Image
                                        source={{ uri: rev?.user?.avatar }}
                                        style={[
                                            styles.userAvatar,
                                            {
                                                marginRight:
                                                    index === 0 ? 0 : -10,
                                            },
                                        ]}
                                    />
                                )}
                            </View>
                        ))}
                    </View>

                    <Text
                        onPress={() =>
                            navigation.navigate('TrainerReviewsScreen', {
                                trainer_id,
                            })
                        }
                        style={{ color: COLORS.primaryOrangeHex }}
                    >
                        Read all reviews
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    parent: { marginTop: 20, marginHorizontal: 10 },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    peopleRow: { flexDirection: 'row', alignItems: 'center' },

    fourPlusContainer: {
        backgroundColor: COLORS.primaryOrangeHex,
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    fourPlusText: { fontSize: 16, fontWeight: '600' },

    userAvatar: { width: 40, height: 40, borderRadius: 20 },
});
