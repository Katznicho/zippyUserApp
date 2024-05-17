import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/ProfileScreens/Profile';
import { useNavigation } from '@react-navigation/native';
import PrivatePolicy from '../screens/ProfileScreens/PrivatePolicy';
import AboutUs from '../screens/ProfileScreens/AboutUs';
import { COLORS } from '../theme/theme';
import SupportScreen from '../screens/ProfileScreens/SupportScreen';
import EditProfile from '../screens/ProfileScreens/EditProfile';
import { generalStyles } from '../screens/utils/generatStyles';
import ArrowBack from '../components/ArrowBack';




const Stack = createNativeStackNavigator();

const SupportStack = () => {
    const navigation = useNavigation<any>();

    return (
        <Stack.Navigator initialRouteName="SupportScreen">
            <Stack.Screen

                name="ProfileScreen"
                component={Profile}
                options={{
                    title: 'Your Profile',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',

                }}
            />
            <Stack.Screen
                name="PrivatePolicy"
                component={PrivatePolicy}
                options={{
                    title: 'Private Policy',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ArrowBack />

                    ),
                }}
            />
            <Stack.Screen
                name="AboutUs"
                component={AboutUs}
                options={{
                    title: 'About Us',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ArrowBack />
                    ),
                }}
            />

            <Stack.Screen
                name="SupportScreen"
                component={SupportScreen}
                options={{
                    title: 'Support',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ArrowBack />
                    ),
                }}
            />

            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    title: 'Edit Profile',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ArrowBack />
                    ),
                }}
            />





        </Stack.Navigator>
    );
};

export default SupportStack;
