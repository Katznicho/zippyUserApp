
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import AllSavedPlaces from '../screens/Saved/AllSavedPlaces';
import MoverRequestsScreen from '../screens/movers/MoverRequestsScreen';
import RequestDetailsScreen from '../screens/movers/RequestDetailsScreen';


const Stack = createNativeStackNavigator();

/**
 * Generates the function comment for the given function body.
 *
 * @return {JSX.Element} The JSX element representing the NotificationStack component.
 */


const MoverStack = (): JSX.Element => {

    return (
        <Stack.Navigator
            initialRouteName="MoverRequestsScreen"
        >

            <Stack.Screen
                name="MoverRequestsScreen"
                component={MoverRequestsScreen}
                options={{
                    animation: 'slide_from_bottom',
                    headerShown: false,

                }}
            />

            <Stack.Screen
                name="RequestDetails"
                component={RequestDetailsScreen}
                options={{
                    animation: 'slide_from_bottom',
                    headerShown: false,

                }}
            />



        </Stack.Navigator>
    );
};

export default MoverStack;
