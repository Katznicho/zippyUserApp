/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS, FONTSIZE } from '../theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  formatCurrency,
  limitDescription,
} from '../screens/utils/helpers/helpers';
import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';
import { showMessage } from 'react-native-flash-message';
import { showAuthScreen } from '../redux/store/slices/UserSlice';
import { CHECK_IF_PROPERTY_LIKED, DISLIKE_PROPERTY, LIKE_PROPERTY } from '../screens/utils/constants/routes';

const { width } = Dimensions.get('window');
const PropertyCard = ({ property , nextScreen=true}: any) => {
  const navigation = useNavigation<any>();
  //const { position  = useGetUserLocation();
  const dispatch = useDispatch<any>();
  const [liked, setLiked] = useState<boolean>(false);
  const { guestUser, authToken } = useSelector( (state: RootState) => state.user);

  const isFocused = useNavigation().isFocused();



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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const onScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setCurrentImageIndex(index);
  };

  //likes section
  useEffect(() => {
    checkIfPropertyIsLiked()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [isFocused]);

const checkIfPropertyIsLiked =async ()=>{
   const response = await fetch(`${CHECK_IF_PROPERTY_LIKED}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            property_id: property?.id
        })
    });
    const res = await response.json();
    if (res.success == true) {
        return setLiked(true);
    }
    else {
        return setLiked(false);
    }

}

const handleLike = () => {

    if (guestUser) {
        //  return dispatch(showAuthScreen())
        return handleShowAlert();
    }
    if (!liked) {
        //LIKE_PROPERTY
        fetch(`${LIKE_PROPERTY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                property_id: property?.id
            })
        }).then(response=>response.json())
        .then(res=>{

             if(res.success==true){
                setLiked(true)
                
                return showMessage({
                    message: 'Liked Successfully',
                    description: 'Property liked successfully',
                    type: 'success',
                    icon: 'success',
                    duration: 3000,
                    autoHide: true,
                    position: 'center'
                })
             }
             else{
                setLiked(false);
                return showMessage({
                    message:'Failed to like property',
                    type:'danger',
                    icon:'danger',
                    duration:3000,
                    position:'bottom'
                })
             }
            
        }).catch(()=>{
            return showMessage({
                message:'Failed to like property',
                type:'danger',
                icon:'danger',
                duration:3000,
                position:'bottom'
            })
        })

    }
    else {
        
        fetch(`${DISLIKE_PROPERTY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                property_id: property?.id
            })
        }).then(response=>response.json())
        .then(res=>{
             console.log(res)
             if(res.success==true){
                setLiked(false)
                return showMessage({
                    message: 'Liked Removed',
                    description: 'Property liked removed successfully',
                    type: 'success',
                    icon: 'success',
                    duration: 3000,
                    autoHide: true,
                    position: 'bottom'
                })
             }
             else{
                setLiked(true);
                return showMessage({
                    message:'Failed to remove like property',
                    type:'danger',
                    icon:'danger',
                    duration:3000,
                    position:'bottom'
                })
             }
            
        }).catch(()=>{
            return showMessage({
                message:'Failed to like property',
                type:'danger',
                icon:'danger',
                duration:3000,
                position:'bottom'
            })
        })
    }

}

  //likes section

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.container]}
      onPress={() =>nextScreen? navigation.navigate('PropertyDetails', { data: property }):null}
    >
      {/* scroll area */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      >
        {property?.property_images?.map((image: string, index: number) => (
          <ImageBackground
            key={index}
            source={{ uri: image }}
            style={[styles.dataBackgroundImage, { width: width}]}
          >
            {/* positioned number */}
            <View style={styles.imageIndicatorContainer}>
              <Text style={styles.imageIndicatorText}>
                {currentImageIndex + 1}/{property?.property_images?.length}
              </Text>
            </View>
            {/* positioned number */}

            {/* positioned like */}
            <TouchableOpacity
              activeOpacity={1}
              style={styles.heartIconContainer}
              onPress={() => handleLike()}
            >
              <Entypo
                name="heart"
                size={25}
                color={
                  liked ? COLORS.primaryDarkRedHex : COLORS.primaryWhiteHex
                }
              />
            </TouchableOpacity>
            {/* positioned like */}
          </ImageBackground>
        ))}
      </ScrollView>
      {/* scoll area */}

      <View style={{ marginHorizontal: 10 }}>
        <View>
          <Text style={[generalStyles.CardTitle]}>{property?.name}</Text>
        </View>

        <View
          style={[
            generalStyles.flexStyles,
            {
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 5,
            },
          ]}
        >
          <Text style={[generalStyles.CardSubtitle]}>
            {property?.category?.name}
          </Text>
          <View style={[generalStyles.flexStyles, { alignItems: 'center' }]}>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <AntDesign key={index} name="star" size={12} color={'gold'} />
              ))}
          </View>
        </View>

        <View style={[{ marginLeft: 3, marginVertical: 2 }]}>
          <Text style={[generalStyles.CardSubtitle]}>
            {limitDescription(property?.description, 10)}
          </Text>
        </View>

        <View style={[generalStyles.flexStyles, { alignItems: 'center' }]}>
          <Entypo
            name="location-pin"
            size={20}
            color={COLORS.primaryOrangeHex}
          />
          <Text
            style={[generalStyles.CardTitle, { fontSize: FONTSIZE.size_10 }]}
          >
            {property?.location}
          </Text>
        </View>

        <View style={[generalStyles.flexStyles, { alignItems: 'center' }]}>
          <View style={[generalStyles.flexStyles, { alignItems: 'center' }]}>
            <MaterialIcons
              name="meeting-room"
              size={18}
              color={COLORS.primaryOrangeHex}
              style={{ marginHorizontal: 3 }}
            />

            <Text
              style={[
                generalStyles.CardTitle,
                { fontSize: FONTSIZE.size_10, marginTop: 5 },
              ]}
            >
              {property?.number_of_beds} bedrooms
            </Text>
          </View>
          <View
            style={[
              generalStyles.flexStyles,
              { alignItems: 'center', justifyContent: 'center' },
            ]}
          >
            <FontAwesome
              name="bathtub"
              size={18}
              color={COLORS.primaryOrangeHex}
              style={{ marginHorizontal: 5 }}
            />

            <Text
              style={[
                generalStyles.CardTitle,
                { fontSize: FONTSIZE.size_10, marginTop: 5 },
              ]}
            >
              {property?.number_of_baths} bathrooms
            </Text>
          </View>
        </View>

        <View
          style={[
            generalStyles.flexStyles,
            { alignItems: 'center', marginVertical: 5, marginHorizontal: 3 },
          ]}
        >
          <Text style={[generalStyles.CardTitle]}>
            {' '}
            {property?.currency?.name} {formatCurrency(property?.price)}
          </Text>
          <Text style={[generalStyles.CardSubtitle]}>
            {property?.payment_period?.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({
  imageStyles: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // borderRadius: 10
  },
  container: {
    width: '94%',
    height: 270,
    elevation: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    // alignContent: 'center',
    // alignItems: 'center',
  },
  viewStyles: {
    marginHorizontal: 5,
    // marginVertical: 2
  },
  imageIndicatorContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //backgroundColor: "red",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imageIndicatorText: {
    color: 'white',
    fontSize: 14,
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 30,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: COLORS.primaryBlackHex,
    //backgroundColor: "red",
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  heartIcon: {
    width: 30,
    height: 30,
  },
  dataBackgroundImage: {
     aspectRatio: 25 / 15,
    justifyContent: 'space-between',
    //height:500
  },
});
