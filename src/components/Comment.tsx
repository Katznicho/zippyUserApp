import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { theme } from '../theme/theme';
import RatingBox from './RatingBox';
import { TrainerReviewType } from '../types';
import moment from 'moment';
import { DEFAULT_USER_PROFILE } from '../constants/endpoints';

const Comment = ({ item }: { item: TrainerReviewType }) => {
    const [collapsed, setCollapsed] = React.useState(true);

    //
    //
    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <Image
                    source={{ uri: item?.user?.avatar ?? DEFAULT_USER_PROFILE }}
                    style={styles.commenterAvatar}
                />

                <Text style={styles.commenterName} numberOfLines={1}>
                    {item?.user?.first_name} {item?.user?.last_name}
                </Text>

                <RatingBox rating={item?.rating} />
            </View>

            <Text
                style={styles.sComment}
                numberOfLines={collapsed ? 5 : undefined}
                onPress={() => setCollapsed(!collapsed)}
            >
                {item?.comment}
            </Text>

            <Text style={styles.sTime}>
                {moment(item?.created_at).format('Do, MMM YYYY')}
            </Text>
        </View>
    );
};

export default Comment;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.darkBlack,
        borderRadius: 20,
        padding: 10,
    },

    userContainer: { flexDirection: 'row', alignItems: 'center' },

    commenterAvatar: { width: 30, height: 30, borderRadius: 30 },

    commenterName: {
        color: theme.colors.white,
        fontSize: 17,
        marginLeft: 10,
        flex: 1,
        fontWeight: '600',
    },

    sComment: { color: theme.colors.white, marginTop: 10 },

    sTime: {
        color: theme.colors.buttonColor,
        fontSize: 10,
        marginTop: 6,
        textAlign: 'right',
    },
});
