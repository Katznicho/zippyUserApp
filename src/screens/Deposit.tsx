import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { generalStyles } from './utils/generatStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../theme/theme';
import { ActivityIndicator } from '../components/ActivityIndicator';
import { showMessage } from 'react-native-flash-message';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import { LOAD_POINTS, PROCESSORDER } from './utils/constants/routes';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from './utils/helpers/helpers';

const Deposit = () => {
    const { user, authToken } = useSelector((state: RootState) => state.user);
    const [amount, setAmount] = useState<number>(0);
    const [formattedAmount, setFormattedAmount] = useState<string>('');
    const [points, setPoints] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>(user.phone);
    const [loading, setLoading] = useState<boolean>(false);


    const [errors, setErrors] = useState<any>({});

    const navigation = useNavigation<any>();
    const [redirect_url, setRedirect_url] = useState('');

    const onDeposit = () => {
        try {
            if (amount === 0) {
                setLoading(false);
                return setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    amount: "Amount is required"
                }));
            }
            if (phoneNumber === "") {
                setLoading(false);
                return setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    phoneNumber: "Phone number is required"
                }));
            }
            // if (reason === "") {
            //     setLoading(false);
            //     return setErrors((prevErrors: any) => ({
            //         ...prevErrors,
            //         reason: "Reason is required"
            //     }));
            // }

            setLoading(true);

            const body =  JSON.stringify({
                amount: amount,
                reason: reason,
                phone_number: phoneNumber,
                points: points,
                payment_type: "Points"
            });

            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            };
        

            const requestOptions = { method: 'POST', headers: headers, body: body };

            fetch(`${LOAD_POINTS}`, requestOptions).then((response) => {
                return response.json();
            }).then((result) => {

                 setLoading(false);
                if(result.success){
                    showMessage({
                      message:"Select Payment Method",
                      type: 'success',
                      icon: 'success',
                      position:"center",
                      autoHide: true,
                      duration:3000
                    })
                    return navigation.navigate('MyWebView', {url:result.data});
                   }
                   else{
                    return showMessage({
                       message: 'Failed to load points', 
                       description: 'Please try again', 
                       type: 'danger', 
                       icon: 'danger'
                        });
                   }
            }).catch((error) => {
                showMessage({
                    message: 'Failed to create pin',
                    description: 'Please try again',
                    type: 'info',
                    icon: 'info',
                    duration: 3000,
                    autoHide: true,
                });
                setLoading(false);
            });
        } catch (error) {
            showMessage({
                message: 'Failed to create pin',
                description: 'Please try again',
                type: 'danger',
                icon: 'danger',
                duration: 3000,
                autoHide: true,
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        if (redirect_url) {
            navigation.navigate('MyWebView', {
                url: redirect_url
            });
        }
    }, [redirect_url]);

    useEffect(() => {
        calculateTotalAmount();
    }, [points]);

    const calculateTotalAmount = () => {
        const pointsValue = parseFloat(points);
        if (!isNaN(pointsValue)) {
            const amountValue = pointsValue * 10; 
            setAmount(amountValue);
            setFormattedAmount(`UGX ${formatCurrency(amountValue)}`);
        } else {
            setAmount(0);
            setFormattedAmount('UGX 0.00');
        }
    };

    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                contentContainerStyle={{
                    margin: 20,
                }}
                keyboardShouldPersistTaps="always"
            >
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>
                        Load Points to Wallet
                    </Text>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={[generalStyles.textStyle]}>
                        Once the payment is confirmed, points will be added to your wallet.
                    </Text>
                </View>
                {/* points */}
                <View style={generalStyles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Total Points</Text>
                    </View>
                    <Text>Each Point is 10/=</Text>
                    <View>
                        <TextInput
                            style={[generalStyles.formInput, generalStyles.borderStyles, errors.amount && generalStyles.errorInput]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            keyboardType="number-pad"
                            placeholder={'Enter Points'}
                            onChangeText={text => setPoints(text)}
                            value={points}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
                    <View>
                        {errors.amount && <Text style={generalStyles.errorText}>{errors.amount}</Text>}
                    </View>
                </View>
                {/* points*/}

                {/* total amount */}
                <View style={generalStyles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Total Amount
                        </Text>
                    </View>
                    <View>
                        <TextInput
                            style={[generalStyles.formInput, generalStyles.borderStyles, { backgroundColor: "#ddd" }]}
                            placeholder="Total Amount"
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            keyboardType="numeric"
                            value={formattedAmount}
                            editable={false}
                        />
                    </View>
                </View>
                {/* total amount */}

                {/* phone number */}
                <View style={generalStyles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Phone Number</Text>
                    </View>
                    <TextInput
                        style={[generalStyles.formInput, generalStyles.borderStyles, errors.phoneNumber && generalStyles.errorInput]}
                        placeholder="+256 700 000 000"
                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        keyboardType="number-pad"
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                    />
                    <View>
                        {errors.phoneNumber && <Text style={generalStyles.errorText}>{errors.phoneNumber}</Text>}
                    </View>
                </View>
                {/* phone number */}

                {/* reason */}
                <View style={generalStyles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Reason(optional)</Text>
                    </View>
                    <TextInput
                        style={[generalStyles.formInput, generalStyles.borderStyles, errors.reason && generalStyles.errorInput]}
                        placeholder="For example: Points Load"
                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        keyboardType="default"
                        value={reason}
                        onChangeText={text => setReason(text)}
                    />
                    <View>
                        {errors.reason && <Text style={generalStyles.errorText}>{errors.reason}</Text>}
                    </View>
                </View>
                {/* reason */}
                <TouchableOpacity
                    activeOpacity={1}
                    style={generalStyles.loginContainer}
                    onPress={() => onDeposit()}>
                    <Text style={generalStyles.loginText}>{'Load Points'}</Text>
                </TouchableOpacity>
                {/* button */}
                {loading && <ActivityIndicator />}
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default Deposit;
