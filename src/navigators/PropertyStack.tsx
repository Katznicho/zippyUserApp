import { TouchableOpacity } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import MyWebView from '../screens/MyWebView';
import Entypo from 'react-native-vector-icons/Entypo';
import Deposit from '../screens/Deposit';
import ArrowBack from '../components/ArrowBack';
import AllTransactions from '../screens/AllTransactions';
import AllProperties from '../screens/AllProperties';
import AllUsers from '../screens/AllUsers';
import TransactionDetails from '../screens/TransactionDetails';
import PropertyDetails from '../screens/PropertyDetails';
import PropertyImages from '../screens/PropertyImages';
import ConfirmAndPay from '../screens/ConfirmAndPay';
import AddPropertyReview from '../screens/property/AddPropertyReview';
import AllPropertyComments from '../screens/property/AllPropertyComments';
import AgentProfile from '../screens/agent/AgentProfile';
import AddAgentReview from '../screens/agent/AddAgentReview';
import AgentComments from '../screens/agent/AgentComments';



const Stack = createNativeStackNavigator();

const PropertyStack = () => {
    const navigation = useNavigation<any>();

    return (
        <Stack.Navigator initialRouteName="PropertyDetails">

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

                        {/* confirm and pay */}
             <Stack.Screen
                name="ConfirmAndPay"
                component={ConfirmAndPay}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Confirm and Pay',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />,

                }}>
            </Stack.Screen>
            {/* confirm and pay */}

            {/* property rating */}
            <Stack.Screen
                name="AddReviewScreen"
                component={AddPropertyReview}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Rate Property',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />,

                }}>
            </Stack.Screen>
            {/* property rating */}



            {/* all property reviews */}
            <Stack.Screen
                name="AllPropertyReviews"
                component={AllPropertyComments}
                options={{
                    animation: 'slide_from_bottom',
                    headerShown: false
                }}>
            </Stack.Screen>
            {/* all property reviews */}

            {/* agent section */}
            <Stack.Screen
                name="AddAgentReview"
                component={AddAgentReview}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Rate Agent',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />,

                }}>
            </Stack.Screen>
            <Stack.Screen
                name="AgentProfile"
                component={AgentProfile}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Agent Profile',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />,

                }}>
            </Stack.Screen>

            <Stack.Screen
                name="AgentComments"
                component={AgentComments}
                options={{
                    animation: 'slide_from_bottom',
                    headerShown:false

                }}>
            </Stack.Screen>
            {/* agent section */}

            {/* my webview */}
            <Stack.Screen
                name="BookingWebView"
                component={MyWebView}
                options={{
                    animation: 'slide_from_bottom',
                    headerShown:false

                }}>
            </Stack.Screen>
            {/* my webview */}


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
        </Stack.Navigator>
    );
};

export default PropertyStack;
