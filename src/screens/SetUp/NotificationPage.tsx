import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { LOGGED_IN_USER } from '../utils/constants/routes';
import { showMessage } from 'react-native-flash-message';
import { updateSetupToTrue, updateUserState } from '../../redux/store/slices/UserSlice';
import { ActivityIndicator } from '../../components/ActivityIndicator/ActivityIndicator';

const NotificationPage = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const [loading , setLoading] = useState<boolean>(false)

  const { user, authToken,isSetupComplete } = useSelector((state: RootState) => state.user);



  const dispatch = useDispatch<any>();

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleNotifyMe = () => {
    // Logic for enabling notifications
    //navigation.navigate('NextScreen'); // Navigate to the next screen
    setLoading(true)
    fetch(LOGGED_IN_USER, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    }).then(response => response.json())
    .then(async result => {
      setLoading(false)
      if(result?.response=="success"){

        let name = result?.data?.name || '';
        let firstName = name.split(' ')[0] || null;
        let lastName = name.split(' ')[1] || null;

        dispatch(
            updateUserState({
                isLoggedIn: true,
                isSetupComplete: true,
                user: {
                  UID: result?.data?.user?.id || null,
                  fname: firstName,
                  lname: lastName,
                  email: result?.data?.email || null,
                  phone: result?.data?.phone_number || null,
                  displayPicture: result?.user?.avatar || null,
                  role: result?.data?.role || null,
                  points: result?.data?.points || null,
                  dob: result?.data?.dob || null
                },
                authToken: authToken,
                guestUser: false
            })
        );

         dispatch(updateSetupToTrue())
          return  showMessage({
          message: 'Success',
          description: 'Notifications enabled successfully',
          type: 'success',
          icon: 'success',
         })
        //  return navigation.navigate('Home');
        // dispatch(updateUserState(result?.user))
        // navigation.navigate('NextScreen'); // Navigate to the next screen
      }
    }).catch(error => {
      setLoading(false)

      return showMessage({
        message: 'Error',
        description: 'Something went wrong',
        type: 'danger',
        icon: 'danger',
      })
    })
    
  };

  const handleSkip = () => {
    // Logic for skipping notifications
    navigation.navigate('NextScreen'); // Navigate to the next screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../assets/app_images/notification_bell.png')} // Ensure you have the appropriate image
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>Turn on notifications?</Text>
      <Text style={styles.subtitle}>
        Don’t miss important messages like check-in details and account activity
      </Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>
          Get property deals, personalized recommendations, and more
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: COLORS.primaryOrangeHex }}
          thumbColor={isEnabled ? COLORS.primaryOrangeHex : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <TouchableOpacity
        style={styles.notifyButton}
        onPress={handleNotifyMe}
      >
        <Text style={styles.notifyButtonText}>Yes, notify me</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={handleSkip}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color:"black"
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color:"black"
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  switchText: {
    fontSize: 16,
    color:"black"
  },
  notifyButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%',
  },
  notifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
  },
  skipButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default NotificationPage;
