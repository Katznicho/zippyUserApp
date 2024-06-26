import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '../navigators/AuthStack';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import DrawerNavigator from '../navigators/DrawerNavigator';
import SetUpStack from '../navigators/SetUpStack'; // Import SetUpStack

const Stack = createNativeStackNavigator();

const Base = () => {
    const { isLoggedIn, guestUser, user, isSetupComplete } = useSelector((state: RootState) => state.user);



    useEffect(() => {
    }, [isLoggedIn, guestUser, user, isSetupComplete]);

    return (
        <NavigationContainer>
            {
                isLoggedIn ? (
                    isSetupComplete ? (
                        <DrawerNavigator />
                    ) : (
                        <SetUpStack />
                    )
                ) : (
                    guestUser ? (
                        <DrawerNavigator />
                    ) : (
                        <AuthStack />
                    )
                )
            }
        </NavigationContainer>
    )
}

export default Base;
