import {
    Text,
    View,
    TouchableOpacity,

    ScrollView,
    TextInput,
    StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

import {  VERIFY_PHONE_OTP } from '../utils/constants/routes';
import { causeVibration, getErrorMessage } from '../utils/helpers/helpers';
import { showMessage } from 'react-native-flash-message';
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../utils/generatStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserState } from '../../redux/store/slices/UserSlice';
import { useDispatch } from 'react-redux';
import { OtpInput } from "react-native-otp-entry";


const VerifyPhoneNumber = () => {

    const [otpCode, setOtpCode] = useState<any>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showResendLink, setShowResendLink] = useState<boolean>(false);
    const dispatch = useDispatch();

    const [timer, setTimer] = useState(120); // Initial timer value in seconds

    const { params } = useRoute<any>();
    const { phoneNumber, provider } = params;
    const [errors, setErrors] = useState<any>({});

    const rotation = useSharedValue(0);
    const ANGLE = 10;

    const errorStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: rotation.value,
                },
            ],
            marginLeft: 14,
        };
    });

    function triggerErrorAnimation() {
        rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(ANGLE, { duration: 100 }), 4, true),
            withTiming(0, { duration: 50 }),
        );
    }



    const navigation = useNavigation<any>();

    useEffect(() => {
        // Start the timer when the component mounts
        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer === 0) {
                    clearInterval(interval);
                    // Perform action when timer reaches zero (e.g., enable the link)
                    setShowResendLink(true);
                    return prevTimer;
                }
                setShowResendLink(false);
                return prevTimer - 1;
            });
        }, 1000);

        // Clear the timer when the component unmounts
        return () => clearInterval(interval);
    }, []);



    //
    //Verify email address
    function verifyEmail() {
        if (otpCode == "") {
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                otpCode: "Code is required"
            }));
            return;
        }
        setLoading(true);

        const headers = new Headers();
        headers.append('Accept', 'application/json');


        const body = new FormData();
        body.append('phone_number', phoneNumber.toLowerCase());
        body.append('otp', otpCode);

        fetch(`${VERIFY_PHONE_OTP}`, {
            method: 'POST',
            headers,
            body,
        })
            .then(response => response.json())
            .then(async result => {
                console.log(result);

                if (result?.errors) {
                    setErrors(result.errors);
                    causeVibration();
                    triggerErrorAnimation();
                    return setLoading(false);
                }

                if (result.response === 'failure') {
                    // setErrors({
                    //   // email: [result?.message],
                    //   password: [result?.message],
                    // });
                    setErrors((prevErrors: any) => ({
                        ...prevErrors,
                        otpCode: "Code is invalid",
                    }));
                    causeVibration();
                    triggerErrorAnimation();
                    showMessage({
                        message: "Code Invalid",
                        description: "The code entered is invalid. Please try again.",
                        icon: "danger",
                        type: "danger",
                        autoHide: true,
                        duration: 3000

                    })
                    return setLoading(false);
                }

                if (result.response === 'success') {
                    //dispatch(loginUser());
                    showMessage({
                        message: "Phone Number Verified",
                        description: "Your phone number has been verified",
                        icon: "success",
                        type: "success",
                        autoHide: true,
                        duration: 3000

                    })
                    let name = result?.data?.user?.name || '';
                    let firstName = name.split(' ')[0] || null;
                    let lastName = name.split(' ')[1] || null;

                    let email = result?.data?.user?.email || null
                    let dob = result?.data?.user?.dob || null
                    let phone = result?.data?.user?.phone_number || null

                    let isSetupComplete = name != '' || email != null  || phone != null ? true : false

                    dispatch(
                        updateUserState({
                            isLoggedIn: true,
                            guestUser: false,
                            isSetupComplete,
                            user: {
                                UID: result?.data?.user?.id || null,
                                fname: firstName,
                                lname: lastName,
                                email: result?.data?.user?.email || null,
                                phone: result?.data?.user?.phone_number || null,
                                displayPicture: result?.data?.user?.avatar || null,
                                role: result?.data?.user?.role || null,
                                points: result?.data?.user?.points || null
                            },
                            authToken: result?.data?.authToken,
                            
                        })
                    );

                    return await AsyncStorage.setItem('token', result?.data.authToken);
                    //navigation.navigate("Login");
                }

                setLoading(false);
            })
            .catch(error => {
                console.log('error', error);

                setLoading(false);
            });
    }

    //
    //
    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                contentContainerStyle={{ margin: 20 }}
                keyboardShouldPersistTaps="always"
            >


                <View style={styles.contentRow}>
                    <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>Verification?</Text>
                </View>

                <View style={styles.contentRow}>
                    <Text style={[generalStyles.textStyle]}>
                        Check your phone. We have sent you a code
                    </Text>
                </View>

                <View>
                    <View style={generalStyles.formContainer}>
                        
                        {/* <TextInput

                            style={[generalStyles.formInput, generalStyles.borderStyles, errors.code && generalStyles.errorInput]}
                            placeholder="Code"
                            placeholderTextColor={COLORS.primaryLightGreyHex}
                            keyboardType="number-pad"
                            value={otpCode}
                            onChangeText={text => {
                                setOtpCode(text);

                                if (errors?.otp) {
                                    setErrors({
                                        ...errors,
                                        otp: '',
                                    });
                                }
                            }}
                            maxLength={6}
                        /> */}
                         <OtpInput
                            numberOfDigits={6}
                            focusColor={COLORS.primaryOrangeHex}
                            onFilled={(text) => setOtpCode(text)}
                            hideStick={true}
                            onTextChange={(text) => setOtpCode(text)}
                            textInputProps={{
                                accessibilityLabel: "One-Time Password",
                              }}
                              theme={{
                                  pinCodeTextStyle: { color: COLORS.primaryWhiteHex },
                              }}
                        />

                        <Animated.Text style={[styles.errorColor, errorStyle]}>
                            {getErrorMessage(errors, 'otp')}
                        </Animated.Text>
                        <View>
                            {errors.otpCode && <Text style={generalStyles.errorText}>{errors.otpCode}</Text>}
                        </View>

                    </View>

                    {showResendLink && (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[
                                generalStyles.centerContent,
                                { marginTop: 30 },
                            ]}
                            onPress={() => {
                                setOtpCode('');

                                setErrors({
                                    ...errors,
                                    otp: '',
                                });
                                navigation.navigate('ResendPhoneNumber');
                            }}
                        >
                            <Text style={{ color: COLORS.primaryOrangeHex }}>
                                Click here to Resend Otp
                            </Text>
                        </TouchableOpacity>
                    )}

                    {!showResendLink && (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[generalStyles.centerContent]}
                        >
                            <Text style={{ color: COLORS.primaryOrangeHex }}>
                                Resend Otp in {timer} seconds
                            </Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        activeOpacity={1}
                        style={generalStyles.loginContainer}
                        onPress={() => verifyEmail()}>
                        <Text style={generalStyles.loginText}>{'Verify'}</Text>
                    </TouchableOpacity>

                    {loading && <ActivityIndicator />}


                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default VerifyPhoneNumber;

const styles = StyleSheet.create({


    contentRow: { marginHorizontal: 10, marginVertical: 10 },

    verifyTitle: {
        color: COLORS.primaryBlackHex,
        fontSize: 30,
        fontWeight: 'bold',
    },

    verifyText: {
        color: COLORS.primaryLightGreyHex,
        fontSize: 15,
    },

    otpInput: {
        color: COLORS.primaryBlackHex,
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primaryBlackHex,
        padding: 10,
    },

    errorColor: { color: '#EF4444', fontSize: 12 },
});
