import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllAlerts from '../screens/zippyAlertScreens/AllAlerts';
import { generalStyles } from '../screens/utils/generatStyles';
import ArrowBack from '../components/ArrowBack';
import { COLORS } from '../theme/theme';
import AlertDetails from '../screens/zippyAlertScreens/AlertDetails';

const Stack = createNativeStackNavigator();

const ZippyAlertStack = () => {
    return (
        <Stack.Navigator initialRouteName="MyAlerts">

            <Stack.Screen
                name="MyAlerts"
                component={AllAlerts}
                options={{
                    title: 'My Zippy Alerts',
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
                name="AlertDetails"
                component={AlertDetails}
                options={{
                    title: 'Alert Details',
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
    )
}

export default ZippyAlertStack

