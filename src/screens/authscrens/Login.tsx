import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState, useRef } from 'react'
import { generalStyles } from '../utils/generatStyles';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/theme';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { showMessage } from 'react-native-flash-message';
import { LOGIN } from '../utils/constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserState } from '../../redux/store/slices/UserSlice';
import { useDispatch } from 'react-redux';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PhoneInput from "react-native-phone-number-input";

const Login = () => {
  const dispatch = useDispatch<any>()


  const navigation = useNavigation<any>();
  const [email, setEmail] = React.useState<any>('');
  const [password, setPassword] = React.useState<any>('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false)
  // Function to toggle the password visibility state 
  const toggleShowPassword = () => { setShowPassword(!showPassword); };

  const [errors, setErrors] = useState<any>({
    email: '',
    password: '',
  });

  // const [formattedValue, setFormattedValue] = useState("");
  const [phoneNumber, setPhoneNumber] = React.useState<any>('');
  const [valid, setValid] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  //phone number details



  const onPressLogin = async () => {
    if (phoneNumber == "") {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        phoneNumber: "Phone number is required"
      }));
      return;
    }
    else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        phoneNumber: ""
      }));
    }


    if (password == "") {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        password: "Passsword is required"
      }));
      return;
    }
    else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        password: ""
      }));
    }

    try {
      setLoading(true)

      const headers = new Headers();
      headers.append('Accept', 'application/json');
      const body = new FormData();
      body.append('phone_number', phoneNumber);
      body.append('password', password);

      fetch(`${LOGIN}`, {
        method: 'POST',
        headers,
        body,
      })
        .then(response => response.json())
        .then(async result => {

          if (result?.errors) {
            setErrors(result.errors);
            showMessage({
              message: "Error",
              description: "Invalid email or password",
              type: "info",
              autoHide: true,
              duration: 3000,
              icon: "danger"
            })
            return setLoading(false);
          }

          if (result.response === 'failure') {
            setErrors({
              // email: [result?.message],
              password: [result?.message],
            });
            showMessage({
              message: "Error",
              description: "Invalid email or password",
              type: "info",
              autoHide: true,
              duration: 3000,
              icon: "danger"
            })
            return setLoading(false);
          }

          if (result?.response === 'success') {
            //login in user with firebase using email and password
            // const userCredentials = await auth().signInWithEmailAndPassword(
            //   email,
            //   password,
            // );

            //store the token in the async storage
            AsyncStorage.setItem('token', result?.authToken);
            //"name": "Katende Nicholas"
            let name = result.user.name;
            let firstName = name.split(' ')[0];
            let lastName = name.split(' ')[1];

            dispatch(
              updateUserState({
                isLoggedIn: true,
                user: {
                  UID: result?.user.id,
                  fname: firstName,
                  lname: lastName,
                  email: result?.user?.email,
                  phone: result?.user?.phone_number,
                  displayPicture: result?.user?.avatar,
                  role: result?.user.role,
                  pooints: result?.user?.points
                },
                authToken: result?.authToken,
              }),
            );

            setLoading(false);
            setEmail('');
            setPassword('');
          }

          setLoading(false);
        })
        .catch(error => {
          // console.log('error', error);
          console.log("=======error==================")
          console.log(error)
          console.log("========error=================")

          setLoading(false);
        });



    } catch (error) {

      console.log("=======error==================")
      console.log(error)
      console.log("========error=================")


      setLoading(false)
      showMessage({
        message: "Error",
        description: "Invalid phone number or password",
        type: "info",
        autoHide: true,
        duration: 3000,
        icon: "danger"
      })
    }

  }

  return (
    <View style={generalStyles.ScreenContainer}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: 50 }}
      >


        {/* center logo */}
        <View style={[generalStyles.centerContent, { marginVertical: 10 }]}>
          <Image
            source={require('../../assets/images/zippy.png')}
            style={{
              width: 100,
              height: 100,
              // tintColor: COLORS.primaryBlackHex,
              borderRadius: 20
            }}
            resizeMode="contain"
          />

        </View>
        {/* center logo */}

        {/* phone number */}
        <View style={generalStyles.formContainer}>
          <View>
            <Text style={generalStyles.formInputTextStyle}>
              Phone Number </Text>
          </View>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="UG"
            layout="second"
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
            placeholder={'enter phone number'}
            containerStyle={[generalStyles.formInput, { backgroundColor: COLORS.primaryLightWhiteGrey, }]}
            textContainerStyle={{ paddingVertical: 0, backgroundColor: COLORS.primaryLightWhiteGrey }}
            textInputProps={{
              placeholderTextColor: COLORS.primaryWhiteHex
            }}
          />
          <View>
            {errors.phoneNumber && <Text style={generalStyles.errorText}>{errors.phoneNumber}</Text>}
          </View>

        </View>
        {/* phone number */}


        <View style={generalStyles.formContainer}>
          <View>
            <Text style={generalStyles.formInputTextStyle}>
              Password</Text>
          </View >
          <View style={[generalStyles.flexStyles, styles.viewStyles]}>
            <TextInput
              style={[generalStyles.formInput, { flex: 1 }]}
              placeholderTextColor={COLORS.primaryWhiteHex}
              secureTextEntry={!showPassword}
              placeholder={'enter password'}
              onChangeText={text => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color={COLORS.secondaryGreyHex}
              style={styles.icon}
              onPress={toggleShowPassword}
            />

          </View>

          <View>
            {errors.password && <Text style={generalStyles.errorText}>{errors.password}</Text>}
          </View>

        </View>



        <View style={generalStyles.forgotPasswordContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={generalStyles.forgotText}>
              {'Forgot password?'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={1}
          style={generalStyles.loginContainer}
          onPress={() => onPressLogin()}>
          <Text style={generalStyles.loginText}>{'Login'}</Text>
        </TouchableOpacity>


        {loading && <ActivityIndicator />}
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({

  icon: {
    marginLeft: -20,
  },
  viewStyles: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

});

