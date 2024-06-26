import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { generalStyles } from '../utils/generatStyles';
import { COLORS } from '../../theme/theme';
import { showMessage } from 'react-native-flash-message';
import { causeVibration } from '../utils/helpers/helpers';
import { ActivityIndicator } from '../../components/ActivityIndicator/ActivityIndicator';

const EditProfile = () => {
  const { user, authToken } = useSelector((state: RootState) => state.user);
  const [firstName, setFirstName] = useState(user.fname);
  const [lastName, setLastName] = useState(user.lname);
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    username: '',
  });

  const onEdit = async () => {
    if (!firstName || !lastName || !phoneNumber || !username) {
      if (!firstName) {
        setErrors((prevErrors) => ({ ...prevErrors, firstName: 'First name is required' }));
      }
      if (!lastName) {
        setErrors((prevErrors) => ({ ...prevErrors, lastName: 'Last name is required' }));
      }
      if (!phoneNumber) {
        setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: 'Phone number is required' }));
      }
      if (!username) {
        setErrors((prevErrors) => ({ ...prevErrors, username: 'Username is required' }));
      }
      return;
    }

    setErrors({ firstName: '', lastName: '', phoneNumber: '', username: '' });
    setLoading(true);

    fetch(`${SETUP_ACCOUNT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        username,
      }),
    }).then(response => response.json())
      .then(result => {
        setLoading(false);
        if (result?.errors) {
          setErrors(result.errors);
          causeVibration();
          return;
        }

        if (result.response === 'success') {
          showMessage({
            message: "Profile Updated Successfully",
            description: "Your profile has been updated successfully.",
            icon: "success",
            type: "success",
            autoHide: true,
            duration: 3000
          });
          return;
        }

        if (result.response === 'failure') {
          causeVibration();
          showMessage({
            message: "Error",
            description: result?.message,
            type: "danger",
            autoHide: true,
            duration: 3000,
            icon: "danger"
          });
        }
      }).catch(error => {
        setLoading(false);
        showMessage({
          message: "Error",
          description: error.message,
          type: "danger",
          autoHide: true,
          duration: 3000,
          icon: "danger"
        });
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Edit Profile</Text>
        <View style={styles.formContainer}>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            placeholderTextColor={'black'}
            style={styles.textInput}
          />
          {errors.firstName && <Text style={generalStyles.errorText}>{errors.firstName}</Text>}
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
            placeholderTextColor={'black'}
            style={styles.textInput}
          />
          {errors.lastName && <Text style={generalStyles.errorText}>{errors.lastName}</Text>}
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone number"
            placeholderTextColor={'black'}
            style={styles.textInput}
          />
          {errors.phoneNumber && <Text style={generalStyles.errorText}>{errors.phoneNumber}</Text>}
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor={'black'}
            style={styles.textInput}
          />
          {errors.username && <Text style={generalStyles.errorText}>{errors.username}</Text>}
        </View>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={onEdit}
        >
          <Text style={styles.continueButtonText}>Save Changes</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  formContainer: {
    marginVertical: 20,
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: 'black',
  },
  continueButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
    marginVertical: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfile;
