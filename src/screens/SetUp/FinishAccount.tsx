import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import {  useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import PhoneInput from 'react-native-phone-number-input';
import { generalStyles } from '../utils/generatStyles';
import { COLORS } from '../../theme/theme';
import { SETUP_ACCOUNT } from '../utils/constants/routes';
import { causeVibration } from '../utils/helpers/helpers';
import { showMessage } from 'react-native-flash-message';
import { ActivityIndicator } from '../../components/ActivityIndicator/ActivityIndicator';
import DatePicker from 'react-native-date-picker';



const FinishAccount = () => {
  const { user, authToken } = useSelector((state: RootState) => state.user);


  const navigation = useNavigation<any>();

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
};



  const [firstName, setFirstName] = useState<any>(user.fname);
  const [lastName, setLastName] = useState<any>(user.lname);
  const [dob, setDob] = useState<any>(user.dob);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState<boolean>(false);
  const phoneInput = useRef<any>(null);
  const [phoneNumber, setPhoneNumber] = useState<any>(user.phone);

  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);

  const [errors, setErrors] = useState<any>({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phoneNumber: '',
  });

  const onFinishAccountSetup = async () => {
    if (!firstName || !lastName || !dob || !email || !phoneNumber) {
      if (!firstName) {
        setErrors((prevErrors: any) => ({ ...prevErrors, firstName: 'First name is required' }));
      }
      if (!lastName) {
        setErrors((prevErrors: any) => ({ ...prevErrors, lastName: 'Last name is required' }));
      }
      if (!dob) {
        setErrors((prevErrors: any) => ({ ...prevErrors, dob: 'Date of birth is required' }));
      }
      if (!email) {
        setErrors((prevErrors: any) => ({ ...prevErrors, email: 'Email is required' }));
      }
      if (!phoneNumber) {
        setErrors((prevErrors: any) => ({ ...prevErrors, phoneNumber: 'Phone number is required' }));
      }
      return;
    }

   


    setErrors((prevErrors: any) => ({ ...prevErrors, firstName: '', lastName: '', dob: '', email: '', phoneNumber: '' }));
    setLoading(true);
    const formData =  new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('dob', dob);
    formData.append('email', email);
    formData.append('phone', phoneNumber);
    setLoading(true)
    fetch(`${SETUP_ACCOUNT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        first_name: firstName || user.fname,
        last_name: lastName || user.lname,
        dob:formatDate(date),
        email:email || user.email,
        phone_number: phoneNumber || user.phone,
      }),
    }).then(response => response.json())
      .then(result => {
        setLoading(false)
        console.log("finish account")
        console.log(result)
        if (result?.errors) {
          setErrors(result.errors);
          causeVibration();
          // triggerErrorAnimation();
          return setLoading(false);
        }

        if (result.response == 'success') {
            showMessage({
              message: "Account Setup Successful",
              description: "Your account has been set up successfully.",
              icon: "success",
              type: "success",
              autoHide: true,
              duration: 3000
            })
          return navigation.navigate('Commitment');
        }

        if(result.response == 'failure'){
          causeVibration();
          // triggerErrorAnimation();
          return showMessage({ message: "Error", description: result?.message, type: "info", autoHide: true, duration: 3000, icon: "danger" })
        }

      }).catch(error => {

        setLoading(false)
        return showMessage({ message: "Error", description: error, type: "info", autoHide: true, duration: 3000, icon: "danger" })
      })
    // Implement your account setup logic here
    setLoading(false);
  };





  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={styles.heading}>Finish signing up</Text>

        <View style={styles.formContainer}>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor={'black'}
            placeholder="First name on ID"
            style={styles.textInput}
          />
          <View>
            {errors.firstName && <Text style={generalStyles.errorText}>{errors.firstName}</Text>}
          </View>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name on ID"
            placeholderTextColor={'black'}
            style={styles.textInput}
          />
          <View>
            {errors.lastName && <Text style={generalStyles.errorText}>{errors.lastName}</Text>}
          </View>
          <TextInput
            value={dob}
            onFocus={() => setOpen(true)}
            onChangeText={text => {
                setDob(text);
                setOpen(true);
            }}
            placeholder="DD/MM/YYYY"
            placeholderTextColor={'black'}
            style={styles.textInput}
          />
          {/* date picker */}
          <DatePicker
                            modal
                            open={open}
                            date={date}
                            title={"Select Your Date of Birth"}
                            maximumDate={new Date("2024-01-01")}
                            mode="date"
                            onConfirm={(date) => {
                                setOpen(false);
                                setDate(date);
                                setDob(formatDate(date)); // Format the date
                            }}
                            onCancel={() => {
                                setOpen(false);
                            }}
                        />
          {/* date picker */}
          <View>
            {errors.dob && <Text style={generalStyles.errorText}>{errors.dob}</Text>}
          </View>
          {
            !user.email && (
              <View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  style={styles.textInput}
                  keyboardType="email-address"
                />

              </View>

            )
          }

          {
            !user.phone && (
              <View>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={phoneNumber}
                  defaultCode="UG"
                  layout="first"
                  onChangeFormattedText={(text) => {
                    setPhoneNumber(text);
                  }}
                  placeholder="Phone number"
                  containerStyle={generalStyles.phoneInputContainer}
                  textContainerStyle={generalStyles.phoneTextInputContainer}
                />

              </View>
            )
          }


        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.continueButton}
          onPress={onFinishAccountSetup}
        >
          <Text style={styles.continueButtonText}>Next</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator />}

      </KeyboardAwareScrollView>
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
    color: "black",
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
    color:"black"
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

export default FinishAccount;
