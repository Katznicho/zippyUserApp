import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import HeadProfileCard from '../../components/HeadProfileCard';
import ProfileDetailsCard from '../../components/ProfileCardDetails';
import { generalStyles } from '../utils/generatStyles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { showAuthScreen } from '../../redux/store/slices/UserSlice';
import { COLORS } from '../../theme/theme';

const Profile = () => {
    const { isLoggedIn } = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch<any>();

    // Profile details array
    const profileDetails = [
        {
            name: 'My Points',
            screen: 'Points',
            requiresLogin: true,
        },
        {
            name: 'Edit Profile',
            screen: 'EditProfile',
            requiresLogin: true,
        },
        {
            name: 'Private Policy',
            screen: 'PrivatePolicy',
            requiresLogin: false,
        },
        {
            name: 'Share App',
            screen: 'Share App',
            requiresLogin: false,
        },
        {
            name: 'About Us',
            screen: 'AboutUs',
            requiresLogin: false,
        },
        {
            name: 'Support',
            screen: 'Support',
            requiresLogin: false,
        },
        {
            name: 'Sign Out',
            screen: 'Sign Out',
            requiresLogin: true,
        },
    ];

    // Filter profile details based on login status
    const filteredProfileDetails = profileDetails.filter(
        (item) => !item.requiresLogin || (item.requiresLogin && isLoggedIn)
    );

    const tabBarHeight = useBottomTabBarHeight();

    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: tabBarHeight }}
                keyboardShouldPersistTaps="always"
            >
                {/* header profile card */}
                <HeadProfileCard />
                {/* header profile card */}

                {/* profile details */}
                <ProfileDetailsCard
                    details={filteredProfileDetails}
                    showSwitch={false}
                />
                {/* profile details */}

                {/* login button */}
                {!isLoggedIn && (
                    <View style={styles.loginButtonContainer}>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => dispatch(showAuthScreen(true))}
                        >
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {/* login button */}
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    loginButtonContainer: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: COLORS.primaryOrangeHex,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Profile;
