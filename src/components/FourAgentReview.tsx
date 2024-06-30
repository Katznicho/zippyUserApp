import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import { useApi } from '../hooks/useApi';
import { DEFAULT_USER_PROFILE, PUBLIC_STORAGE } from '../screens/utils/constants/constants';

type Props = { agent_id: number };

export default function FourAgentReview({ agent_id }: Props) {
    const navigation = useNavigation<any>();

    // Fetch reviews using useApi hook
    const { data, error, isLoading } = useApi<any>({
        endpoint: '/getPropertyAgentCommentsByIdAndPaginated',
        params: {
            agent_id: agent_id,
        },
        queryOptions: {
            enabled: true,
            refetchInterval: 2000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    });




    const getImageUrl = (displayPicture: string | null) => {
        return displayPicture ? `${PUBLIC_STORAGE}profile/${displayPicture}` : DEFAULT_USER_PROFILE;
    }

    return (
        <View>
            {isLoading ? (
                <Text style={[generalStyles.CardTitle]}>Loading...</Text>
            ) : error ? (
                <Text style={[generalStyles.CardTitle]} >Error: {'No Reviews'}</Text>
            ) : (
                <View>
                                                     <Text style={[generalStyles.CardTitle]}>Reviews</Text>
                    {data?.data?.data?.length > 0 ? (
                        <View style={styles.container}>
                            <View style={styles.peopleRow}>
                                {data?.data?.data?.slice(0, 4).map((rev: any, index: number) => (
                                    <Image
                                        key={index}
                                        source={{ uri: getImageUrl(rev?.app_user?.avatar) }}
                                        style={[
                                            styles.userAvatar,
                                            {
                                                marginRight: index === 0 ? 0 : -10,
                                            },
                                        ]}
                                    />
                                ))}
                                {data?.data?.data?.length > 1 && (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.fourPlusContainer}
                                        onPress={() =>
                                            navigation.navigate('AgentComments', {
                                                agent_id,
                                            })
                                        }
                                    >
                                        <Text style={styles.fourPlusText}>4+</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <Text
                                onPress={() =>
                                    navigation.navigate('AgentComments', {
                                        agent_id,
                                    })
                                }
                                style={{ color: COLORS.primaryOrangeHex }}
                            >
                                Read all reviews
                            </Text>
                        </View>
                    ) : (
                        <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', paddingVertical: 5 }]}>
                            <View>
                                <Text style={[generalStyles.CardTitle]}>Reviews</Text>
                                <Text style={[generalStyles.CardSubtitle]}>No reviews yet</Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[
                                        generalStyles.loginContainer,
                                        { width: '100%', marginTop: 0, backgroundColor: COLORS.primaryDarkRedHex },
                                    ]}
                                    onPress={() => navigation.navigate('AddAgentReview', { agent_id })}
                                >
                                    <Text style={generalStyles.loginText}>Add a review</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical:5
    },
    peopleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fourPlusContainer: {
        backgroundColor: "gold",
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fourPlusText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.primaryBlackHex,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: -10,
    },
});
