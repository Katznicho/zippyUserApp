import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '../navigators/AuthStack';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import DrawerNavigator from '../navigators/DrawerNavigator';



const Stack = createNativeStackNavigator();

const Base = () => {
    const { isLoggedIn, guestUser } = useSelector((state: RootState) => state.user);



    useEffect(() => {
    }, [isLoggedIn])



    return (
        <NavigationContainer>
            {
                isLoggedIn || guestUser ?
                    <DrawerNavigator />
                    : <AuthStack />
            }


        </NavigationContainer>
    )
}

export default Base

