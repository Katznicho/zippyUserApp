/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import { generalStyles } from './utils/generatStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Categories from '../components/Categories';
import PropertyDetailScrollView from '../components/PropertyDetailScrollView';
import CategoryTypes from '../components/CategoryTypes';
import ZippyAlertButton from '../components/ZippyAlertButton';
import { BOTTOM_NOTCH } from './utils/constants/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import { SAVE_DEVICE_INFO } from '../screens/utils/constants/routes';
import MoversBanner from '../components/MoversBanner';



const HomeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight() + BOTTOM_NOTCH;

  const { guestUser, authToken } = useSelector((state: RootState) => state?.user);

  useEffect(() => {
    if (!guestUser) {
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
          // Handle error
        }
      })();
    }
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
    const body = JSON.stringify({
      push_token,
      device_id,
      device_model,
      device_manufacturer,
      app_version,
      device_os,
      device_os_version,
      device_user_agent,
      device_type,
    });

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body,
    };

    fetch(`${SAVE_DEVICE_INFO}`, options)
      .then(response => response.json())
      .then(res => {
        // Handle success
      })
      .catch(error => {
        // Handle error
      });
  }

  return (
    <KeyboardAwareScrollView
      style={[generalStyles.ScreenContainer]}
      keyboardShouldPersistTaps="always">
       {/* Zippy Alert Button */}
      <ZippyAlertButton />
      {/* Content */}
      {/* Movers Banner */}
      <MoversBanner />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: tabBarHeight }}>
        <Categories />
        <CategoryTypes text="Near You" screen="AllProperties" />
        <PropertyDetailScrollView />
        <CategoryTypes text="Recent" screen="AllProperties" />
        <PropertyDetailScrollView />
        <CategoryTypes text="Popular" screen="AllProperties" />
        <PropertyDetailScrollView />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  bannerImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  bannerText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
});

export default HomeScreen;
