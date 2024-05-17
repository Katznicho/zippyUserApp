import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { generalStyles } from './utils/generatStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLORS } from '../theme/theme'
import { ActivityIndicator } from '../components/ActivityIndicator'
import { showMessage } from 'react-native-flash-message'
import { RootState } from '../redux/store/dev'
import { useSelector } from 'react-redux';
import { PROCESSORDER } from './utils/constants/routes'
import { useNavigation } from '@react-navigation/native'

const Deposit = () => {
    const [amount, setAmount] = useState<any>('')
    const [points, setPoints] = useState<string>('')
    const [reason, setReason] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const { user, authToken } = useSelector((state: RootState) => state.user);

    const [errors, setErrors] = useState<any>({});

    const navigation = useNavigation<any>()
    const [redirect_url, setRedirect_url] = useState('')

    const onDeposit = () => {
        try {
            if (amount == "") {
                setLoading(false)
                return setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    password: "Amount is required"
                }));

            }
            if (phoneNumber == "") {
                setLoading(false)
                return setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    confirmpassword: "Phone number is required"
                }));

            }
            if (reason == "") {
                setLoading(false)
                return setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    confirmpassword: "Phone number is required"
                }));

            }
            const formData = new FormData();
            formData.append('amount', amount);
            formData.append('description', reason);
            formData.append('phone_number', phoneNumber);
            formData.append('total_points', points);
            formData.append('callback', `https://dashboard.zippyug.com/finishPayment`);
            formData.append('cancel_url', `https://dashboard.zippyug.com/cancelPayment`);
            formData.append("payment_type", "LoadPoints")

            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Authorization', `Bearer ${authToken}`);

            setLoading(true)

            fetch(`${PROCESSORDER}`, {
                method: 'POST',
                headers,
                body: formData
            }).then((response) => {

                return response.json()
            }).then((result) => {

                console.log(result)
                if (result?.response?.success) {
                    setRedirect_url(result?.response?.message?.redirect_url)
                    return navigation.navigate('MyWebView', {
                        url: result?.response?.message?.redirect_url
                    })
                }
                else {
                    setLoading(false);
                    return showMessage({
                        message: "Failed to Initiate Deposit",
                        description: "Please try again",
                        type: "info",
                        icon: "info",
                        duration: 3000,
                        autoHide: true
                    })

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
                return setLoading(false);

            })

        }
        catch (error) {
            showMessage({
                message: 'Failed to create pin',
                description: 'Please try again',
                type: 'info',
                icon: 'info',
                duration: 3000,
                autoHide: true,
            });
            return setLoading(false);

        }

    }

    useEffect(() => {
        if (redirect_url) {
            navigation.navigate('MyWebView', {
                url: redirect_url
            })
        }

    }, [redirect_url])

    const calculateTotalAmount = () => {
        const pointsValue = parseFloat(points);
        if (!isNaN(pointsValue)) {
            const amount = pointsValue * 10; // Each point is 10 Ugandan Shilling
            setAmount(amount);
        } else {
            setAmount(0);
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
                            style={generalStyles.formInput}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            keyboardType="number-pad"
                            placeholder={'Enter Points'}
                            onChangeText={text => {
                                setPoints(text);
                                calculateTotalAmount();
                            }}
                            value={points}
                            maxLength={6}
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
                            style={generalStyles.formInput}
                            placeholder="Total Amount"
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            keyboardType="numeric"
                            value={amount.toString()}
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
                        style={generalStyles.formInput}
                        placeholder="Enter phone number with country code"
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
                            Reason</Text>
                    </View>
                    <TextInput
                        style={generalStyles.formInput}
                        placeholder="Forexample: Points Load"
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
    )
}

export default Deposit

const styles = StyleSheet.create({
    errorColor: { color: '#EF4444', fontSize: 12 },
})