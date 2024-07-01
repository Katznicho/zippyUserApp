
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import AllSavedPlaces from '../screens/Saved/AllSavedPlaces';


const Stack = createNativeStackNavigator();

/**
 * Generates the function comment for the given function body.
 *
 * @return {JSX.Element} The JSX element representing the NotificationStack component.
 */


const SavedPlaceStack = (): JSX.Element => {

  return (
    <Stack.Navigator
      initialRouteName="All"
    >

      <Stack.Screen
        name="All"
        component={AllSavedPlaces}
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,

        }}

      />


    </Stack.Navigator>
  );
};

export default SavedPlaceStack;
