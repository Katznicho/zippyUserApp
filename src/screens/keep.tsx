import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
  } from 'react-native';
  import React, { useState } from 'react';
  import { useNavigation, useRoute } from '@react-navigation/native';
  import { generalStyles } from './utils/generatStyles';
  import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
  import { formatCurrency } from './utils/helpers/helpers';
  import { useDispatch, useSelector } from 'react-redux';
  import { RootState } from '../redux/store/dev';
  import { CREATE_BOOKING } from './utils/constants/routes';
  import { showMessage } from 'react-native-flash-message';
  import { ActivityIndicator } from '../components/ActivityIndicator';
  import { showAuthScreen } from '../redux/store/slices/UserSlice';
  
  const ConfirmAndPay = () => {
    const navigation = useNavigation<any>();
    const { data } = useRoute<any>().params;
    const { guestUser, authToken } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState<boolean>(false);
  
    
  
    const handleShowAlert = () => {
        Alert.alert(
            'Login',
            'You need to login first to continue',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => dispatch(showAuthScreen(true))
                }
            ],
            { cancelable: false }
        );
    };
  
    const handleConfirmAndPay = () => {
        if (guestUser) {
            handleShowAlert();
        } else {
            setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${authToken}`);
  
            const body = new FormData();
            body.append('property_id', data?.id);
            body.append('total_price', data?.price);
  
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body
            };
  
            fetch(`${CREATE_BOOKING}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    showMessage({
                        message: 'Booked Successfully',
                        description: 'We will get back to you soon',
                        type: 'success',
                        icon: 'success'
                    });
                    setLoading(false);
                    return navigation.navigate('Bookings');
                })
                .catch(error => {
                    setLoading(false);
                    showMessage({
                        message: 'Booking Failed',
                        description: 'Please try again',
                        type: 'info',
                        icon: 'info'
                    });
                });
        }
    };
  
    return (
        <View style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                style={{ paddingBottom: 50 }}
            >
                <View style={styles.cardContainer}>
                    <Text style={styles.CardTitle}>{data?.name}</Text>
                    <Text style={styles.CardSubtitle}>
                        {data?.location}
                    </Text>
                    <Text style={styles.CardSubtitle}>
                        {data?.number_of_beds} bedroom(s), {data?.number_of_baths} bathroom(s)
                    </Text>
                    <Text style={styles.CardSubtitle}>
                        {data?.description}
                    </Text>
                    <Text style={styles.priceText}>
                        {data?.currency?.name} {formatCurrency(data?.price)}
                    </Text>
                </View>
                {loading && (
                    <ActivityIndicator
                        style={{ marginTop: 20 }}
                        size="large"
                        color={COLORS.primaryWhiteHex}
                    />
                )}
            </ScrollView>
            <View style={styles.fixedBottomBar}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[generalStyles.loginContainer, styles.confirmButton]}
                    onPress={handleConfirmAndPay}
                >
                    <Text style={generalStyles.loginText}>{'Confirm and Pay'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  };
  
  export default ConfirmAndPay;
  
  const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        margin: 10
    },
    CardTitle: {
        fontFamily: FONTFAMILY.roboto_medium,
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_18,
        marginBottom: 10
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.roboto_regular,
        color: COLORS.primaryLightGreyHex,
        fontSize: FONTSIZE.size_14,
        marginBottom: 5
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primaryBlackHex,
        marginTop: 10
    },
    fixedBottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },
    confirmButton: {
        width: '100%',
        marginTop: 0
    }
  });
  