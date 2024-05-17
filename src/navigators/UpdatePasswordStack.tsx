import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import ChangePassword from '../screens/ChangePassword';



const Stack = createNativeStackNavigator();

const UpdatePasswordStack = () => {
    // const navigation = useNavigation<any>();

    return (
        <Stack.Navigator initialRouteName="ChangePassword">
            <Stack.Screen

                name="ChangePassword"
                component={ChangePassword}
                options={{
                    title: 'Change Password',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',

                }}
            />



        </Stack.Navigator>
    );
};

export default UpdatePasswordStack;
