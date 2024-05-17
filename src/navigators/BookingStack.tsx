
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import ArrowBack from '../components/ArrowBack';
import BookingTabs from '../screens/Bookings/BookingTabs';
import BookingDetails from '../screens/Bookings/BookingDetails';




const Stack = createNativeStackNavigator();

/**
 * Render and return the SupportStack component.
 *
 * @return {ReactNode} The rendered SupportStack component.
 */
function BookingStack() {



    const navigation = useNavigation<any>();

    return (

        <Stack.Navigator
            initialRouteName='BookingTabs'
        >

            <Stack.Screen
                name="BookingTabs"
                component={BookingTabs}
                options={{
                    title: 'My Bookings',
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
                name="BookingDetails"
                component={BookingDetails}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>

    );
}

export default BookingStack