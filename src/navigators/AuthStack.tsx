import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/authscrens/Login';
import { COLORS } from '../theme/theme';
import Register from '../screens/authscrens/Register';
import { generalStyles } from '../screens/utils/generatStyles';
import ForgotPasswordScreen from '../screens/authscrens/ForgotPasswordScreen';
import ChangePasswordForgotEmail from '../screens/authscrens/ChangePasswordForgotEmail';
import VerificationScreen from '../screens/authscrens/VerificationScreen';
import ResendEmailScreen from '../screens/authscrens/ResendEmail';
import VerifyPhoneNumber from '../screens/authscrens/VerifyPhoneNumber';
import ResendPhoneNumberScreen from '../screens/authscrens/ResendPhoneNumber';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
        >
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    // title: 'Login',
                    // headerStyle: {
                    //     backgroundColor: COLORS.primaryOrangeHex
                    // },
                    // headerTitleStyle: generalStyles.titleHeaderStyles,
                    // headerTitleAlign: 'center',
                    // headerTintColor: COLORS.primaryBlackHex,
                    headerShown: false

                }}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    title: 'Register',
                    headerStyle: {
                        backgroundColor: COLORS.primaryOrangeHex
                    },
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryBlackHex,
                }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{
                    title: 'Forgot Password',
                    headerStyle: {
                        backgroundColor: COLORS.primaryOrangeHex
                    },
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryBlackHex,
                }}
            />
            <Stack.Screen
                name="VerifyPhoneNumber"
                component={VerifyPhoneNumber}
                options={{
                    title: 'Verify Phone Number',
                    headerStyle: {
                        backgroundColor: COLORS.primaryOrangeHex
                    },
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryBlackHex,
                }}
            />
            <Stack.Screen
                name="VerifyEmail"
                component={VerificationScreen}
                options={{
                    title: 'Verify Email',
                    headerStyle: {
                        backgroundColor: COLORS.primaryOrangeHex
                    },
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryBlackHex,
                }}
            />
            <Stack.Screen
                name="ResendEmail"
                component={ResendEmailScreen}
                options={{
                    title: 'Resend Email',
                    headerStyle: {
                        backgroundColor: COLORS.primaryOrangeHex
                    },
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryBlackHex,
                }}
            />

            <Stack.Screen
                name="ResendPhoneNumber"
                component={ResendPhoneNumberScreen}
                options={{
                    title: 'Resend OTP',
                    headerStyle: {
                        backgroundColor: COLORS.primaryOrangeHex
                    },
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryBlackHex,
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack

