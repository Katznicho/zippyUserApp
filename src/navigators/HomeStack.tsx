import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CreatePin from '../screens/CreatePin';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS } from '../theme/theme';
import AllTransactions from '../screens/AllTransactions';
import TransactionDetails from '../screens/TransactionDetails';
import ArrowBack from '../components/ArrowBack';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import ChangePassword from '../screens/ChangePassword';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AllProperties from '../screens/AllProperties';
import PropertyDetails from '../screens/PropertyDetails';
import UserDetails from '../screens/UserDetails';
import AllUsers from '../screens/AllUsers';
import PropertyImages from '../screens/PropertyImages';
import HeaderBar from '../components/HeaderBar';
import ZippyAlert from '../screens/ZippyAlert';
import MyWebView from '../screens/MyWebView';
import Deposit from '../screens/Deposit';
import ConfirmAndPay from '../screens/ConfirmAndPay';

const Stack = createNativeStackNavigator();

const HomeStack = () => {

    const { user } = useSelector((state: RootState) => state.user);
    const navigation = useNavigation<any>();

    return (
        <Stack.Navigator initialRouteName={"HomeScreen"} 
        >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    animation: 'slide_from_bottom',
                    headerShown: false
                }}
            >
            </Stack.Screen>

        

            <Stack.Screen
                name="CreateWallet"
                component={CreatePin}
                // options={{ animation: 'slide_from_bottom' }}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Add Wallet',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />

                }}
            >
            </Stack.Screen>

            {/* zippy alert */}
            <Stack.Screen
                name="ZippyAlert"
                component={ZippyAlert}
                // options={{ animation: 'slide_from_bottom' }}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Zippy Alert',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />

                }}
            >
            </Stack.Screen>
            {/* zippy alert */}

            {/* chnage password */}
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                // options={{ animation: 'slide_from_bottom' }}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Change Password',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />

                }}
            >
            </Stack.Screen>
            {/* change password */}


            {/* all transactions */}
            <Stack.Screen
                name="AllTransactions"
                component={AllTransactions}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Transactions',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />
                }}>
            </Stack.Screen>
            {/* all transactions */}

            {/* all properties */}
            {/* all transactions */}
            <Stack.Screen
                name="AllProperties"
                component={AllProperties}
                options={{
                    animation: 'slide_from_bottom',
                    headerShown: false
                }}>
            </Stack.Screen>
            {/* all transactions */}
            {/* all propertes */}

            {/* all users */}
            <Stack.Screen
                name="AllUsers"
                component={AllUsers}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Property Owners',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />
                }}>
            </Stack.Screen>
            {/* all users */}

            {/* transaction details */}
            <Stack.Screen
                name="TransactionDetails"
                component={TransactionDetails}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Transaction Details',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />,

                }}>
            </Stack.Screen>
            {/* transaction details */}




            {/* property details */}
            <Stack.Screen
                name="PropertyDetails"
                component={PropertyDetails}
                options={{
                    animation: 'slide_from_bottom',
                    headerShown: false
                }}>
            </Stack.Screen>
            {/* property details */}


            {/* property images */}
            <Stack.Screen
                name="PropertyImages"
                component={PropertyImages}
                options={{
                    animation: 'slide_from_bottom',
                    headerShown: false
                }}>
            </Stack.Screen>
            {/* property images */}

            {/* user details */}
            <Stack.Screen
                name="UserDetails"
                component={UserDetails}
                options={{
                    title: 'User Details',
                    animation: 'slide_from_bottom',
                    // headerShown: false
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />
                }}>
            </Stack.Screen>
            {/* user details */}


            {/* load points */}
            <Stack.Screen
                name="LoadPoints"
                component={Deposit}
                options={{
                    title: 'Load Points',
                    animation: 'slide_from_bottom',
                    // headerShown: false
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />
                }}>
            </Stack.Screen>
            {/* load points */}

            <Stack.Screen
                name="MyWebView"
                component={MyWebView}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}

export default HomeStack

