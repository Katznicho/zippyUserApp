import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { generalStyles } from './utils/generatStyles';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';
import { formatCurrency } from './utils/helpers/helpers';
import { CREATE_BOOKING } from './utils/constants/routes';
import { RootState } from '../redux/store/dev';
import { showAuthScreen } from '../redux/store/slices/UserSlice';
import { ActivityIndicator } from '../components/ActivityIndicator';

const PropertyDetails: React.FC<any> = () => {
  const navigation = useNavigation<any>();
  const { property } = useRoute<any>().params;
  const { guestUser, authToken } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleShowAlert = () => {
    Alert.alert(
      'Login',
      'You need to login first to continue',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => dispatch(showAuthScreen(true)) },
      ],
      { cancelable: false }
    );
  };

  const handleConfirmAndPay = () => {
    try {
      if (guestUser) {
        handleShowAlert();
      } else {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${authToken}`);

        //console.log(authToken);
  
        const body = new FormData();
        body.append('property_id', property?.id);
        body.append('total_price', property?.price);

        //console.log(body);
  
        const requestOptions = { method: 'POST', headers: myHeaders, body };
  
        fetch(`${CREATE_BOOKING}`, requestOptions)
          .then(response => response.json())
          .then(result => {
             setLoading(false);
             console.log(result)
             if(result.success){
              showMessage({
                message:"Select Payment Method",
                type: 'success',
                icon: 'success',
                position:"center",
                autoHide: true,
                duration:3000
              })
              return navigation.navigate('BookingWebView', {url:result.data});
             }
             else{
              return showMessage({
                 message: 'Booking Failed', 
                 description: 'Please try again', 
                 type: 'danger', 
                 icon: 'danger'
                  });
             }
          })
          .catch(() => {
            setLoading(false);
            showMessage({ message: 'Booking Failed', description: 'Please try again', type: 'danger', icon: 'danger' });
          });
      }
      
    } catch (error) {
       setLoading(false);
       return showMessage({ message: 'Booking Failed', description: 'Please try again', type: 'danger', icon: 'danger', position:"center" });
    }

    
  };

  const serviceFee = 20000;
  const propertyPrice = parseInt(property?.price, 10);
  const totalAmount = propertyPrice + serviceFee;

  return (
    <View style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}>
      <View style={styles.cardContainer}>
        <Text style={styles.CardTitle}>Payment Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.CardLabel}>Price</Text>
          <Text style={styles.CardValue}>{property?.currency?.name} {formatCurrency(propertyPrice)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.CardLabel}>Service Fee</Text>
          <Text style={styles.CardValue}>{property?.currency?.name} {formatCurrency(serviceFee)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.CardLabel}>Total</Text>
          <Text style={styles.CardValue}>{property?.currency?.name} {formatCurrency(totalAmount)}</Text>
        </View>

        <View>
        <TouchableOpacity
          style={[generalStyles.loginContainer, styles.confirmButton]}
          onPress={handleConfirmAndPay}
        >
          <Text style={generalStyles.loginText}>{`Pay ${property?.currency?.name} ${formatCurrency(totalAmount)}`}</Text>
        </TouchableOpacity>
      </View>
      </View>
       {loading && <ActivityIndicator/>}

    </View>
  );
};

export default PropertyDetails;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.roboto_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  CardLabel: {
    fontFamily: FONTFAMILY.roboto_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
  },
  CardValue: {
    fontFamily: FONTFAMILY.roboto_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
  },
  fixedBottomBar: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: COLORS.primaryBlackHex,
    // padding: 20,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderTopWidth: 1,
    // borderTopColor: '#ccc',
  },
  confirmButton: {
    width: '100%',
    backgroundColor: COLORS.primaryDarkRedHex,
  },
});
