/* eslint-disable prettier/prettier */
import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import moment from 'moment';
import { COLORS } from '../theme/theme';
import { DEFAULT_USER_PROFILE, PUBLIC_STORAGE } from '../screens/utils/constants/constants';
import RatingBox from './RatingBox';

const Comment = ({ item }: any) => {
    const [collapsed, setCollapsed] = React.useState(true);

    //
    //
    const getImageUrl = (displayPicture: string | null) => {
        return displayPicture ? `${PUBLIC_STORAGE}profile/${displayPicture}` : DEFAULT_USER_PROFILE;
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <Image
                    source={{ uri: getImageUrl(item?.app_user?.avatar) }}
                    style={styles.commenterAvatar}
                />

                <Text style={styles.commenterName} numberOfLines={1}>
                     {item?.app_user?.name}
                </Text>

                <RatingBox rating={item?.rating} />
            </View>

            <Text
                style={styles.sComment}
                numberOfLines={collapsed ? 2 : undefined}
                onPress={() => setCollapsed(!collapsed)}
            >
                {item?.body}
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
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 20,
        padding: 10,
        marginVertical:4
    },

    userContainer: { flexDirection: 'row', alignItems: 'center' },

    commenterAvatar: { width: 30, height: 30, borderRadius: 30 },

    commenterName: {
        color: COLORS.primaryWhiteHex,
        fontSize: 17,
        marginLeft: 10,
        flex: 1,
        fontWeight: '600',
    },

    sComment: { color: COLORS.primaryWhiteHex, marginTop: 10 },

    sTime: {
        color: COLORS.primaryOrangeHex,
        fontSize: 10,
        marginTop: 6,
        textAlign: 'right',
    },
});
