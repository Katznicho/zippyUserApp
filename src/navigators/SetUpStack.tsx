import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import PrivatePolicy from '../screens/ProfileScreens/PrivatePolicy';
import AboutUs from '../screens/ProfileScreens/AboutUs';
import { COLORS } from '../theme/theme';
import SupportScreen from '../screens/ProfileScreens/SupportScreen';
import EditProfile from '../screens/ProfileScreens/EditProfile';
import { generalStyles } from '../screens/utils/generatStyles';
import ArrowBack from '../components/ArrowBack';
import FinishAccount from '../screens/SetUp/FinishAccount';
import CommitmentPage from '../screens/SetUp/CommitmentPage';
import NotificationPage from '../screens/SetUp/NotificationPage';





const Stack = createNativeStackNavigator();

const SetUpStack = () => {
    const navigation = useNavigation<any>();

    return (
        <Stack.Navigator initialRouteName="FinishAccount">

            {/* account set up */}
            <Stack.Screen
                name="FinishAccount"
                component={FinishAccount}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Finish Account Setup',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',

                }}
            >
            </Stack.Screen>
            {/* account set up */}

            {/* commitment  */}
            <Stack.Screen
                name="Commitment"
                component={CommitmentPage}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Our Commitment',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />

                }}
            >
            </Stack.Screen>
            {/* commitment */}

            {/* notification */}
            <Stack.Screen
                name="NotificationConfirmation"
                component={NotificationPage}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Notifications',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />

                }}
            >
            </Stack.Screen>
            {/* notification */}


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

        </Stack.Navigator>
    );
};

export default SetUpStack;
