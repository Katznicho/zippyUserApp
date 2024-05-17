import { StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import searchScreen from '../screens/searchscreens/SearchScreen';


const Stack = createNativeStackNavigator();

const SearchStack = () => {
    const [openPicker, setOpenPicker] = useState<boolean>(false);
    return (
        <Stack.Navigator initialRouteName="SearchScreen">
            <Stack.Screen
                name="SearchScreen"
                component={searchScreen}
                options={{
                    headerShown: false
                }}
            >

            </Stack.Screen>

        </Stack.Navigator>
    )
}

export default SearchStack

const styles = StyleSheet.create({})