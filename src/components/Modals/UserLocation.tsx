import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useEffect} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS, FONTFAMILY} from '../../theme/theme';
import {generalStyles} from '../../screens/utils/generatStyles';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from '../ActivityIndicator';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {
  openPicker: boolean;
  setOpenPicker: (openPicker: boolean) => void;
  property: any;
  setProperty: (communityDetails: any) => void;
  title: string;
  placeholder: string;
};

navigator.geolocation = require('@react-native-community/geolocation');

const UserLocation: React.FC<Props> = ({
  openPicker,
  setOpenPicker,
  property,
  setProperty,
  title,
  placeholder,
}: Props) => {
  const refRBSheet = useRef<any>();

  useEffect(() => {
    if (openPicker) {
      refRBSheet.current?.open();
    } else {
      refRBSheet.current?.close();
    }
  }, [openPicker]);

  const [location, setLocation] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const navigation = useNavigation<any>();

  const handleTopUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // navigation.navigate('TopToYourCard', { amount });
    }, 5000);
  };

  return (
    <RBSheet
      ref={refRBSheet}
      height={300}
      closeOnDragDown={false}
      closeOnPressMask={false}
      // openDuration={250}
      customStyles={{
        container: {
          // justifyContent: 'center',
          // alignItems: 'center',
          backgroundColor: COLORS.primaryBlackHex,
          borderRadius: 10,
          elevation: 10,
        },

        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}>
      <View style={styles.viewStyles}>
        <Text
          style={[
            {fontSize: 20, fontFamily: FONTFAMILY.poppins_bold},
            generalStyles.textStyle,
          ]}>
          {title}
        </Text>
      </View>

      {/* location */}
      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        placeholder={placeholder}
        currentLocation={true}
        enableHighAccuracyLocation={true}
        autoFillOnNotFound={true}
        textInputProps={{
          placeholderTextColor: COLORS.primaryWhiteHex,
        }}
        renderRow={data => (
          <View style={[generalStyles.flexStyles, {alignItems: 'center'}]}>
            <Entypo
              name="location-pin"
              color={COLORS.primaryOrangeHex}
              size={20}
            />
            <Text style={{color: COLORS.primaryWhiteHex}}>
              {data.description}
            </Text>
          </View>
        )}
        fetchDetails={true}
        debounce={400}
        onFail={error => {

        }}
        enablePoweredByContainer={false}
        minLength={2}
        styles={{
          container: {
            flex: 1,
            width: '100%',
            backgroundColor: COLORS.primaryBlackHex,
            marginHorizontal: 5,
            marginVertical: 10,
          },
          textInputContainer: {
            backgroundColor: COLORS.primaryBlackHex,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            marginHorizontal: 20,
            borderRadius: 20,
          },
          textInput: {
            color: COLORS.primaryWhiteHex,
            backgroundColor: COLORS.primaryBlackHex,
            fontSize: 16,
            borderWidth: 0.5,
            borderColor: COLORS.primaryWhiteHex,
            width: '100%',
          },
          predefinedPlacesDescription: {
            color: COLORS.primaryOrangeHex,
          },
          listView: {
            backgroundColor: COLORS.primaryBlackHex,
            borderRadius: 10,
            // marginHorizontal: 10,
            marginTop: 10,
            // elevation: 5,
            zIndex: 5,
          },
          row: {
            backgroundColor: COLORS.primaryBlackHex,
            padding: 13,
            height: 50,
            flexDirection: 'row',
          },
          separator: {
            height: 0.5,
            backgroundColor: COLORS.primaryOrangeHex,
          },
          description: {
            color: COLORS.primaryOrangeHex,
          },
          poweredContainer: {
            backgroundColor: COLORS.primaryBlackHex,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: COLORS.primaryOrangeHex,
            borderTopWidth: 0.5,
          },
          powered: {
            color: COLORS.primaryOrangeHex,
          },
        }}
        onPress={(data, details = null) => {
          setProperty({
            ...property,
            location: details?.formatted_address,
            lat: details?.geometry.location.lat,
            long: details?.geometry.location.lng,
            address: details?.formatted_address,
            longitude: details?.geometry.location.lng,
            latitude: details?.geometry.location.lat,
          });

          setOpenPicker(false);
        }}
        query={{
          key: 'AIzaSyATT-OoxvppDdCRfNypfjLY5VWbZEqs_GA',
          language: 'en',
          components: 'country:ug',
        }}
        GooglePlacesDetailsQuery={{
          fields: ['formatted_address', 'geometry'],
          language: 'en',
          components: 'country:ug',
        }}
      />
      {/* location */}

      {loading && <ActivityIndicator />}
    </RBSheet>
  );
};

export default UserLocation;

const styles = StyleSheet.create({
  formInput: {
    color: COLORS.primaryWhiteHex,
    fontSize: 15,
    borderWidth: 0.4,
    borderColor: COLORS.primaryLightGreyHex,
    borderRadius: 10,
  },
  buttonCardStyles: {
    width: '80%',
    // marginHorizontal: 20,
    // backgroundColor: COLORS.primaryGreenHex,
  },
  genderStyles: {
    width: 110,
    height: 110,
    padding: 10,
    borderRadius: 100,
    marginVertical: 15,
  },

  viewStyles: {
    width: '90%',
    marginLeft: 25,
    alignSelf: 'center',
    // backgroundColor: COLORS.primaryGreenHex,
    marginTop: 15,
  },
});
