
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import PaymentTabs from '../screens/payments/PaymentTabs';
import PaymentDetails from '../screens/payments/PaymentDetails';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import ArrowBack from '../components/ArrowBack';




const Stack = createNativeStackNavigator();

/**
 * Render and return the SupportStack component.
 *
 * @return {ReactNode} The rendered SupportStack component.
 */
function PaymentStack() {



    const navigation = useNavigation<any>();

    return (

        <Stack.Navigator
            initialRouteName='PaymentTabs'
        >

            <Stack.Screen
                name="PaymentTabs"
                component={PaymentTabs}
                options={{
                    title: 'My Payments',
                    headerStyle: {
                        backgroundColor: COLORS.primaryOrangeHex
                    },
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryBlackHex,
                    headerLeft: () => (
                        <ArrowBack />
                    ),


                }}
            />

            <Stack.Screen
                name="PaymentDetails"
                component={PaymentDetails}
                options={{
                    title: 'Payment Details',
                    headerStyle: {
                        backgroundColor: COLORS.primaryBlackHex,
                    },
                    headerTitleStyle: {
                        fontSize: 30,
                    },
                    headerTintColor: COLORS.primaryWhiteHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ArrowBack />
                    ),
                }}
            />

        </Stack.Navigator>

    );
}

export default PaymentStack