import { } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import PrivatePolicy from '../screens/ProfileScreens/PrivatePolicy';
import AboutUs from '../screens/ProfileScreens/AboutUs';
import { COLORS } from '../theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SupportScreen from '../screens/ProfileScreens/SupportScreen';
import EditProfile from '../screens/ProfileScreens/EditProfile';
import { generalStyles } from '../screens/utils/generatStyles';




const Stack = createNativeStackNavigator();

const AboutUsStack = () => {
    const navigation = useNavigation<any>();

    return (
        <Stack.Navigator initialRouteName="AboutUsScreen">

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
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ProfileScreen')}
                            style={{ marginLeft: 10 }}
                        >
                            <Entypo
                                name="chevron-left"
                                color={COLORS.primaryBlackHex}
                                size={28}
                            />
                        </TouchableOpacity>

                    ),
                }}
            />
            <Stack.Screen
                name="AboutUsScreen"
                component={AboutUs}
                options={{
                    title: 'About Us',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Home')}
                            style={{ marginLeft: 10 }}
                        >
                            <Entypo
                                name="chevron-left"
                                color={COLORS.primaryBlackHex}
                                size={28}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="Support"
                component={SupportScreen}
                options={{
                    title: 'Support',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Home')}
                            style={{ marginLeft: 10 }}
                        >
                            <Entypo
                                name="chevron-left"
                                color={COLORS.primaryBlackHex}
                                size={28}
                            />
                        </TouchableOpacity>
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
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Home')}
                            style={{ marginLeft: 10 }}
                        >
                            <Entypo
                                name="chevron-left"
                                color={COLORS.primaryBlackHex}
                                size={28}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />





        </Stack.Navigator>
    );
};

export default AboutUsStack;
