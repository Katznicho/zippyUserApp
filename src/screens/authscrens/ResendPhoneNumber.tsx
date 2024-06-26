import {
    Text,
    View,
    TextInput,
    ScrollView,
    StyleSheet,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { causeVibration } from '../utils/helpers/helpers';
import { RESEND_OTP, RESEND_PHONE_OTP } from '../utils/constants/routes';
import { generalStyles } from '../utils/generatStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/theme';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { showMessage } from 'react-native-flash-message';
import PhoneInput from 'react-native-phone-number-input';


const ResendPhoneNumberScreen = () => {
    const navigation = useNavigation<any>();
    const phoneInput = useRef(null);


    const [loading, setLoading] = useState<boolean>(false);
    const [phoneNumber, setPhoneNumber] = useState('');

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
            marginLeft: 17,
        };
    });

    function triggerErrorAnimation() {
        rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(ANGLE, { duration: 100 }), 4, true),
            withTiming(0, { duration: 50 }),
        );
    }

    //
    //Resend OTP
    function resendOtp() {
        if (phoneNumber == "") {
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                phoneNumber: "Phone number is required"
            }));
            return;
        }


        setLoading(true);

        const headers = new Headers();
        headers.append('Accept', 'application/json');

        const body = new FormData();
        body.append('phone_number', phoneNumber.toLowerCase());

        fetch(`${RESEND_PHONE_OTP}`, {
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
                    setErrors({
                        // email: [result?.message],
                        password: [result?.message],
                    });
                    causeVibration();
                    triggerErrorAnimation();
                    return setLoading(false);
                }
                showMessage({
                    message: "Code Resent",
                    description: "An otp has been resent to your email",
                    icon: "success",
                    type: "success",
                    autoHide: true,
                    duration: 3000
                })

                navigation.navigate('VerifyPhoneNumber', { phoneNumber: phoneNumber, provider:"phoneNumber" });


                setLoading(false);
            })
            .catch(error => {
                console.log('error', error);

                setLoading(false);
            });
    }

    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView keyboardShouldPersistTaps="always"
                contentContainerStyle={{
                    margin: 20,
                }}
            >


                <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>Resend OTP Code</Text>

                <Text style={[generalStyles.textStyle]}>
                    Please re-enter your phone number again to resend verification code
                </Text>

                <View style={generalStyles.formContainer}>


                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={phoneNumber}
                        defaultCode="UG"
                        layout="first"
                        onChangeFormattedText={(text) => {
                            setPhoneNumber(text);
                        }}
                        placeholder="Phone number"
                        containerStyle={styles.phoneInputContainer}
                        textContainerStyle={styles.phoneTextInputContainer}
                    />
                    <View>
                        {errors.phoneNumber && <Text style={generalStyles.errorText}>{errors.phoneNumber}</Text>}
                    </View>

                </View>

                {/* button */}
                <TouchableOpacity
                    activeOpacity={1}
                    style={generalStyles.loginContainer}
                    onPress={() => resendOtp()}>
                    <Text style={generalStyles.loginText}>{'Resend OTP'}</Text>
                </TouchableOpacity>
                {/* button */}
                {loading && <ActivityIndicator />}
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default ResendPhoneNumberScreen;



const styles = StyleSheet.create({
    phoneInputContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    phoneTextInputContainer: {
        paddingVertical: 0,
        backgroundColor: '#f5f5f5',
    },

})
