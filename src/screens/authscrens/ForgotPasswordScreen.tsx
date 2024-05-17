import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { showMessage } from 'react-native-flash-message';
import { FORGOT_PASSWORD } from '../utils/constants/routes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { generalStyles } from '../utils/generatStyles';
import { COLORS } from '../../theme/theme';
import { causeVibration, validateEmail } from '../utils/helpers/helpers';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import PhoneInput from "react-native-phone-number-input";

const ForgotPasswordScreen = () => {

    const [errors, setErrors] = useState<any>({ email: '', });

    // const [formattedValue, setFormattedValue] = useState("");
    const [phoneNumber, setPhoneNumber] = React.useState<any>('');
    const [valid, setValid] = useState(false);
    const phoneInput = useRef<PhoneInput>(null);



    const rotation = useSharedValue(0);
    const ANGLE = 10;

    function triggerErrorAnimation() {
        rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(ANGLE, { duration: 100 }), 4, true),
            withTiming(0, { duration: 50 }),
        );
    }

    const [loading, setLoading] = useState<boolean>(false);

    const navigation = useNavigation<any>();

    function onForgotPassword() {
        if (phoneNumber == "") {
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                phoneNumber: "Email is required"
            }));
            return;
        }


        setLoading(true);

        const headers = new Headers();
        headers.append('Accept', 'application/json');

        const body = new FormData();
        body.append('phone_number', phoneNumber);

        fetch(`${FORGOT_PASSWORD}`, {
            method: 'POST',
            headers,
            body,
        })
            .then(response => response.json())
            .then(async result => {

                if (result?.errors) {
                    setErrors(result.errors);
                    causeVibration();
                    triggerErrorAnimation();
                    showMessage({
                        message: 'Phone number not found',
                        description: 'This phone number is not registered with us',
                        type: 'info',
                        icon: 'info',
                        duration: 3000,
                        autoHide: true,
                    });
                    return setLoading(false);
                }

                if (result.response === 'failure') {
                    setErrors({
                        // email: [result?.message],
                        password: [result?.message],
                    });
                    causeVibration();
                    triggerErrorAnimation();
                    showMessage({
                        message: 'Email not found',
                        description: 'This phone nummber is not registered with us',
                        type: 'info',
                        icon: 'info',
                        duration: 3000,
                        autoHide: true,
                    });
                    return setLoading(false);
                }
                showMessage({
                    message: 'A code has been sent to your  phone number and email',
                    description: 'Please check ',
                    type: 'success',
                    icon: 'success',
                    duration: 3000,
                    autoHide: true,
                });

                navigation.navigate('ChangePasswordForgotEmail', {
                    phoneNumber: phoneNumber
                });


                setLoading(false);
            })
            .catch(error => {
                console.log(error);

                setLoading(false);
            });
    }
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
                    <Text
                        style={[generalStyles.textStyle, { fontSize: 20 }]}
                    >
                        Forgot Password?
                    </Text>
                </View>

                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text
                        style={[generalStyles.textStyle]}
                    >
                        Enter your phone number. We will send you instructions on how to reset your password on email and phone number
                    </Text>
                </View>

                <View>
                    {/* phone number */}
                    <View style={generalStyles.formContainer}>
                        <View>
                            <Text style={generalStyles.formInputTextStyle}>
                                Phone Number </Text>
                        </View>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={phoneNumber}
                            defaultCode="UG"
                            layout="second"
                            onChangeFormattedText={(text) => {
                                setPhoneNumber(text);
                            }}
                            placeholder={'enter phone number'}
                            containerStyle={[generalStyles.formInput, { backgroundColor: COLORS.primaryLightWhiteGrey, }]}
                            textContainerStyle={{ paddingVertical: 0, backgroundColor: COLORS.primaryLightWhiteGrey }}
                            textInputProps={{
                                placeholderTextColor: COLORS.primaryWhiteHex
                            }}
                        />
                        <View>
                            {errors.phoneNumber && <Text style={generalStyles.errorText}>{errors.phoneNumber}</Text>}
                        </View>

                    </View>
                    {/* phone number */}

                    {/* button */}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={generalStyles.loginContainer}
                        onPress={() => onForgotPassword()}>
                        <Text style={generalStyles.loginText}>{'Send'}</Text>
                    </TouchableOpacity>
                    {/* button */}
                    {loading && <ActivityIndicator />}
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default ForgotPasswordScreen;
