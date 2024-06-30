import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import { BASE_URL } from '../screens/utils/constants/routes';
import { generalStyles } from '../screens/utils/generatStyles';

type Props = { property_id: number };

export default function FourReviews({ property_id }: Props) {
    
    const [fourReviews, setFourReviews] = useState([]);

    const navigation = useNavigation<any>();
    //COMMENTS_BY_ID 

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
        <View>
            {fourReviews?.length > 0 ? (
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
                                                    property_id,
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
                                property_id,
                            })
                        }
                        style={{ color: COLORS.primaryOrangeHex }}
                    >
                        Read all reviews
                    </Text>
                </View>
            ):(
                <View style={[generalStyles.flexStyles ,{ justifyContent: 'space-between', paddingVertical: 5}]}>
                     <View>
                     <Text style={[generalStyles.CardTitle]}>Reviews</Text>
                     <Text style={[generalStyles.CardSubtitle]}>No reviews yet</Text>

                     </View>
                     <View>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[
                                        generalStyles.loginContainer,
                                        { width: '100%', marginTop: 0, backgroundColor:COLORS.primaryDarkRedHex }
                                    ]}
                                    onPress={() => navigation.navigate("AddReviewScreen", { property_id })}
                                >
                                    <Text style={generalStyles.loginText}>
                                        {'Add a review'}
                                    </Text>
                                </TouchableOpacity>
                            </View>



                </View>

            )
            }
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
