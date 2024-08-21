import {Platform} from 'react-native';
import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import {RootState} from '../redux/store/dev';
import {useSelector} from 'react-redux';
import {UPDATE_USER_LOCATION} from '../screens/utils/constants/routes';
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';

const useGetUserLocation = () => {
  const {authToken, guestUser} = useSelector((state: RootState) => state.user);
  const [position, setPosition] = React.useState<any>(null);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos: {coords: {latitude: any; longitude: any}}) => {
        const {latitude, longitude} = pos.coords;
        setPosition({latitude, longitude});

        // Update user location
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);
        const body = new FormData();
        body.append('lat', latitude);
        body.append('long', longitude);

        if (!guestUser) {
          fetch(`${UPDATE_USER_LOCATION}`, {
            method: 'POST',
            headers,
            body,
          })
            .then(response => {
              // if (!response.ok) {
              //     throw new Error('Failed to update position');
              // }
              return response.json();
            })
            .catch(error => {
            });
        }
      },
      (error: any) => {

      },
      {enableHighAccuracy: true},
    );
  };

  // React.useEffect(() => {
  //     getCurrentPosition();
  // }, []);
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      isLocationEnabled().then(isLocationEnabled => {
        if (!isLocationEnabled) {
          promptForEnableLocationIfNeeded();
        } else {
          getCurrentPosition();
        }
      });
    } else {
      getCurrentPosition();
    }
  }, []);

  return {
    position,
  };
};

export default useGetUserLocation;
