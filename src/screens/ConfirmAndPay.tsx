import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-ui-lib';
import { generalStyles } from './utils/generatStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { PUBLIC_STORAGE } from './utils/constants/constants';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { formatCurrency, onMakeCall } from './utils/helpers/helpers';
import { CREATE_BOOKING } from './utils/constants/routes';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';
import { showAuthScreen } from '../redux/store/slices/UserSlice';

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
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => dispatch(showAuthScreen(true)),
        },
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
      body.append('property_id', property?.id);
      body.append('total_price', property?.price);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body,
      };

      fetch(`${CREATE_BOOKING}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          showMessage({
            message: 'Booked Successfully',
            description: 'We will get back to you soon',
            type: 'success',
            icon: 'success',
          });
          setLoading(false);
          return navigation.navigate('Bookings');
        })
        .catch((error) => {
          setLoading(false);
          showMessage({
            message: 'Booking Failed',
            description: 'Please try again',
            type: 'info',
            icon: 'info',
          });
        });
    }
  };

  const serviceFee = 20000;
  const propertyPrice = parseInt(property?.price, 10);
  const totalAmount = propertyPrice + serviceFee;

  const formatMoney = (amount: number) => {
    return formatCurrency(amount);
  };

  return (
    <View style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" style={{ paddingBottom: 50 }}>
        {/* view more images */}
        <View style={styles.cardContainer}>
          <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
          <View>
            <Text style={styles.CardTitle}>Property Details</Text>
          </View>

          <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <View>
              <Text style={styles.CardTitle}>Name</Text>
              <Text style={styles.CardSubtitle}>{property?.name}</Text>
            </View>
            <View>
              <Text style={styles.CardTitle}>Category</Text>
              <Text style={styles.CardSubtitle}>{property?.category?.name}</Text>
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.CardTitle}>Location</Text>
              <Text style={styles.CardSubtitle}>{property?.location}</Text>
            </View>
            <View>
              <Text style={styles.CardTitle}>Total Rooms</Text>
              <Text style={styles.CardSubtitle}>{property?.number_of_rooms}</Text>
            </View>
          </View>

          <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <View>
              <Text style={styles.CardTitle}>Total Bedrooms</Text>
              <Text style={styles.CardSubtitle}>{property?.number_of_beds}</Text>
            </View>
            <View>
              <Text style={styles.CardTitle}>Total Bathrooms</Text>
              <Text style={styles.CardSubtitle}>{property?.number_of_baths}</Text>
            </View>
          </View>
          <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <View>
              <Text style={styles.CardTitle}>Status</Text>
              <Text style={styles.CardSubtitle}>{property?.status?.name}</Text>
            </View>
            <View>
              <Text style={styles.CardTitle}>Zippy ID</Text>
              <Text style={styles.CardSubtitle}>{property?.zippy_id}</Text>
            </View>
          </View>

          <View>
            <View>
              <Text style={styles.CardTitle}>Description</Text>
              <Text style={styles.CardSubtitle}>{property?.description}</Text>
            </View>
            <View>
              <Text style={styles.CardTitle}>Year Built</Text>
              <Text style={styles.CardSubtitle}>{property?.year_built}</Text>
            </View>
          </View>

          {/* payment details */}
          <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
          <View>
            <Text style={styles.CardTitle}>Payment Details</Text>
          </View>
          <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={styles.CardTitle}>Price</Text>
            <Text style={styles.CardSubtitle}>{property?.currency?.name} {formatMoney(propertyPrice)}</Text>
          </View>

          <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={styles.CardTitle}>Service Fee</Text>
            <Text style={styles.CardSubtitle}>{property?.currency?.name} {formatMoney(serviceFee)}</Text>
          </View>

          <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={styles.CardTitle}>Total</Text>
            <Text style={styles.CardSubtitle}>{property?.currency?.name} {formatMoney(totalAmount)}</Text>
          </View>

          <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
          <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <View>
              <Text style={styles.CardTitle}>Services</Text>
              {property?.services?.map((service: any, index: number) => (
                <Text style={styles.CardSubtitle} key={index}>{service?.name}</Text>
              ))}
            </View>
            <View>
              <Text style={styles.CardTitle}>Amenities</Text>
              {property?.amenities?.map((amenity: any, index: number) => (
                <Text style={styles.CardSubtitle} key={index}>{amenity?.name}</Text>
              ))}
            </View>
          </View>
          <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />

          {/* public facilities */}
          <View>
            <View>
              <Text style={styles.CardTitle}>Public Facilities</Text>
              {property?.public_facilities?.map((facility: any, index: number) => (
                <Text style={styles.CardSubtitle} key={index}>{facility}</Text>
              ))}
            </View>
          </View>
          <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
          {/* public facilities */}
        </View>
        {/* view more images */}
      </ScrollView>
      <View style={styles.fixedBottomBar}>
        <TouchableOpacity
          activeOpacity={1}
          style={[generalStyles.loginContainer, styles.confirmButton]}
          onPress={handleConfirmAndPay}
        >
          <Text style={generalStyles.loginText}>{`Pay ${property?.currency?.name} ${formatMoney(totalAmount)}`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PropertyDetails;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: 10,
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    margin: 5,
    // marginHorizontal: 5
  },
  CardTitle: {
    fontFamily: FONTFAMILY.roboto_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.roboto_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
    // marginHorizontal: SPACING.space_10
  },
  CardPriceCurrency: {
    fontFamily: FONTFAMILY.roboto_medium,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_12,
  },
  hairLineStyles: {
    width: '80%',
    // marginHorizontal: 40,
    marginVertical: 10,
  },
  spacingStyles: {
    marginHorizontal: 5,
    // marginVertical: 5
  },
  ImageHeaderBarContainerWithBack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  propertyBackgroundImage: {
    width: '100%',
    aspectRatio: 25 / 15,
    justifyContent: 'space-between',
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
    borderTopColor: '#ccc',
  },
  confirmButton: {
    width: '100%',
    marginTop: 0,
    backgroundColor: COLORS.primaryDarkRedHex,
  },
});
