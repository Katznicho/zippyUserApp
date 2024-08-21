/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {ScrollView} from 'react-native';
import {generalStyles} from './utils/generatStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Categories from '../components/Categories';
import PropertyDetailScrollView from '../components/PropertyDetailScrollView';
import CategoryTypes from '../components/CategoryTypes';
import ZippyAlertButton from '../components/ZippyAlertButton';
import {BOTTOM_NOTCH} from './utils/constants/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import {SAVE_DEVICE_INFO} from '../screens/utils/constants/routes';

const HomeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight() + BOTTOM_NOTCH;

  const {guestUser, authToken} = useSelector((state: RootState) => state?.user);


  //device details
    // User device and push token
    useEffect(() => {
      if (!guestUser) { // Check if the user is not a guest
        (async () => {
          try {
            let deviceId = DeviceInfo.getDeviceId();
            let model = DeviceInfo.getModel();
            const manufacture = await DeviceInfo.getManufacturer();
            let readableVersion = DeviceInfo.getReadableVersion();
            let systemName = DeviceInfo.getSystemName();
            let systemVersion = DeviceInfo.getSystemVersion();
            const userAgent = await DeviceInfo.getUserAgent();
            const type = DeviceInfo.getDeviceType();

            const devicePushToken = await messaging().getToken();


            // Register the device with FCM
            await messaging().registerDeviceForRemoteMessages();



            if (
              deviceId &&
              model &&
              manufacture &&
              readableVersion &&
              systemName &&
              systemVersion &&
              userAgent &&
              type
            ) {
              saveDeviceInfo(
                devicePushToken,
                deviceId,
                model,
                manufacture,
                readableVersion,
                systemName,
                systemVersion,
                userAgent,
                type,
              );
            }
          } catch (error) {

          }
        })();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authToken, guestUser]);

    function saveDeviceInfo(
      push_token: string,
      device_id: string,
      device_model: string,
      device_manufacturer: string,
      app_version: string,
      device_os: string,
      device_os_version: string,
      device_user_agent: string,
      device_type: string,
    ) {

 

  
       const  body =  JSON.stringify({
         'push_token': push_token,
         'device_id': device_id,
         'device_model': device_model,
         'device_manufacturer': device_manufacturer,
         'app_version': app_version,
         'device_os': device_os,
         'device_os_version': device_os_version,
         'device_user_agent': device_user_agent,
         'device_type': device_type,
       });

       const options = {
         method: 'POST',
         headers:{
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${authToken}`,
         },
         body,
       }


      fetch(`${SAVE_DEVICE_INFO}`, options)
      .then(response=>response.json())
      .then(res=>{
      })
      .catch((error) => {

      });
    }
  //device details

  return (
    <KeyboardAwareScrollView
      style={[generalStyles.ScreenContainer]}
      keyboardShouldPersistTaps="always">
      {/* floating button */}
      <ZippyAlertButton />
      {/* floating button */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{paddingBottom: tabBarHeight}}>
        {/* menu icon */}

        {/* menu icon */}

        {/* categories */}
        <Categories />
        {/* categories */}

        {/* near me*/}
        <CategoryTypes text="Near You" screen="AllProperties" />
        <PropertyDetailScrollView />
        {/* near me */}

        {/* recent */}
        <CategoryTypes text="Recent" screen="AllProperties" />
        <PropertyDetailScrollView />
        {/* recent */}

        {/* recent */}
        <CategoryTypes text="Popular" screen="AllProperties" />
        <PropertyDetailScrollView />
        {/* recent */}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default HomeScreen;
