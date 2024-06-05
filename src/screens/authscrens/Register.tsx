import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState, useRef } from 'react'
import { generalStyles } from '../utils/generatStyles'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import { COLORS, FONTFAMILY } from '../../theme/theme'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator } from '../../components/ActivityIndicator'
import { showMessage } from 'react-native-flash-message'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { REGISTER } from '../utils/constants/routes'
import { validateEmail } from '../utils/helpers/helpers';
import PhoneInput from "react-native-phone-number-input";
import { skipFirstLogin } from '../../redux/store/slices/UserSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store/dev'
import { Image } from 'react-native'

const Register = () => {

  const dispatch = useDispatch<AppDispatch>();

  const navigation = useNavigation<any>();
  const [firstName, setFirstName] = React.useState<any>('');
  const [secondName, setSecondName] = React.useState<any>('');
  const [email, setEmail] = React.useState<any>('');
  const [password, setPassword] = React.useState<any>('');
  const [confirmPassword, setConfirmPassword] = React.useState<any>('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({
    firstName: '',
    secondName: "",
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User',
  });

  //phone number details
  const [value, setValue] = useState("");
  // const [formattedValue, setFormattedValue] = useState("");
  const [phoneNumber, setPhoneNumber] = React.useState<any>('');
  const [valid, setValid] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  //phone number details

  const [showPassword, setShowPassword] = useState<boolean>(false)
  // Function to toggle the password visibility state 
  const toggleShowPassword = () => { setShowPassword(!showPassword); };


  const onRegister = async () => {

    // Validate email format
    if (!validateEmail(email)) {

      setErrors((prevErrors: any) => ({
        ...prevErrors,
        email: 'Invalid email format',
      }));
      return;

    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        email: '',
      }));
    }

    // Validate password matching
    if (password !== confirmPassword) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        passwordMatch: 'Passwords do not match',
      }));
      return;
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        passwordMatch: '',
      }));
    }

    const trimmedFields = {
      firstName: firstName.trim(),
      secondName: secondName.trim(),
      email: email.trim(),
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
      phoneNumber: phoneNumber.trim(),
    };
    setLoading(true)
    Keyboard.dismiss()

    try {
      const headers = new Headers();
      headers.append('Accept', 'application/json');

      const body = new FormData();
      body.append('email', email.toLowerCase());
      body.append('password', password);
      body.append("phone_number", phoneNumber)
      body.append("first_name", firstName);
      body.append("last_name", secondName);
      body.append("role", "User");

      body.append("confirm_password", confirmPassword);
      fetch(`${REGISTER}`, {
        method: 'POST',
        headers,
        body,
      })
        .then(response => response.json())
        .then(async result => {
          console.log(result);

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
            showMessage({
              message: "VerifyEmail",
              description: "An verification code has been sent to your email",
              type: "success",
              autoHide: true,
              duration: 3000,
              icon: "success"
            })
            navigation.navigate("VerifyEmail", { email: email })
            setLoading(false);

          }

          setLoading(false);
        })
        .catch(error => {
          console.log('error', error);

          setLoading(false);
        });
    }
    catch (error) {
      setLoading(false);
      showMessage({
        message: "Error",
        description: "An error occured while creating your account",
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
        style={{
          flex: 1,
          width: '100%',
        }}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}

      >
        {/* login and register */}
        {/* <Text style={styles.title}>{'Login'}</Text> */}

        {/* center logo */}
        <View style={[generalStyles.centerContent, { marginVertical: 10 }]}>
          <Image
            source={require('../../assets/images/zippy.png')}
            style={{
              width: 50,
              height: 50,
              // tintColor: COLORS.primaryBlackHex,
              borderRadius: 20
            }}
            resizeMode="contain"
          />

        </View>
        {/* center logo */}

        {/* first name */}
        <View style={generalStyles.formContainer}>
          <View>
            <Text style={generalStyles.formInputTextStyle}>
              First  Name</Text>
          </View>

          <TextInput
            style={[generalStyles.formInput, generalStyles.borderStyles, styles.textInputMarginRight, errors.firstName && generalStyles.errorInput]}
            placeholder={'Enter First Name'}
            keyboardType="default"
            placeholderTextColor={COLORS.primaryWhiteHex}
            onChangeText={text => setFirstName(text)}
            value={firstName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <View>
            {errors.firstName && <Text style={generalStyles.errorText}>{errors.firstName}</Text>}
          </View>

        </View>
        {/* first name */}


        {/* second name */}
        <View style={generalStyles.formContainer}>
          <View>
            <Text style={generalStyles.formInputTextStyle}>
              Second   Name</Text>
          </View>

          <TextInput
            style={[generalStyles.formInput, generalStyles.borderStyles, styles.textInputMarginRight, errors.firstName && generalStyles.errorInput]}
            placeholder={'Enter Second Name'}
            keyboardType="default"
            placeholderTextColor={COLORS.primaryWhiteHex}
            onChangeText={text => setSecondName(text)}
            value={secondName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <View>
            {errors.secondName && <Text style={generalStyles.errorText}>{errors.secondName}</Text>}
          </View>

        </View>
        {/* second name */}




        {/* phone number */}
        <View style={generalStyles.formContainer}>
          <View>
            <Text style={generalStyles.formInputTextStyle}>
              Phone Number </Text>
          </View>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="UG"
            layout="second"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              console.log(text)
              setPhoneNumber(text);
            }}
            placeholder={'Enter Phone Number'}
            containerStyle={[generalStyles.formInput, generalStyles.borderStyles, { backgroundColor: COLORS.primaryBlackHex, }]}
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



        {/* email */}
        <View style={generalStyles.formContainer}>
          <View>
            <Text style={generalStyles.formInputTextStyle}>
              Email</Text>
          </View>

          <TextInput
            style={[generalStyles.formInput, generalStyles.borderStyles, styles.textInputMarginRight, errors.firstName && generalStyles.errorInput]}
            placeholder={'Enter Email'}
            keyboardType="email-address"
            placeholderTextColor={COLORS.primaryWhiteHex}
            onChangeText={text => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <View>
            {errors.email && <Text style={generalStyles.errorText}>{errors.email}</Text>}
          </View>

        </View>
        {/* email */}

        {/* password */}
        {/* password */}

        <View style={[generalStyles.formContainer, { marginVertical: 10 }]}>
          <View>
            <Text style={generalStyles.formInputTextStyle}>
              Password </Text>
          </View>

          <View style={[generalStyles.flexStyles, generalStyles.borderStyles, { alignItems: "center" }]}>
            <TextInput
              style={[generalStyles.formInput]}
              placeholderTextColor={COLORS.primaryWhiteHex}
              secureTextEntry={!showPassword}
              placeholder={'Enter Password'}
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

        {/* password */}
        {/* password */}

        {/* confirm password */}
        {/* confirm password */}
        <View style={generalStyles.formContainer}>
          <View>
            <Text style={generalStyles.formInputTextStyle}>
              Confirm Password</Text>
          </View>
          <View style={[generalStyles.flexStyles, generalStyles.borderStyles, { alignItems: "center" }]}>
            <TextInput
              style={[generalStyles.formInput, { flex: 1 }]}
              placeholderTextColor={COLORS.primaryWhiteHex}
              secureTextEntry={!showPassword}
              placeholder={'Confirm  Password'}
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
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
            {errors.confirmpassword && <Text style={generalStyles.errorText}>{errors.confirmpassword}</Text>}
          </View>

        </View>

        {/* confirm  password*/}
        {/* conform passsword */}

        <TouchableOpacity
          activeOpacity={1}
          style={generalStyles.loginContainer}
          onPress={() => onRegister()}>
          <Text style={generalStyles.loginText}>{'Register'}</Text>
        </TouchableOpacity>

        {/* already have an account login */}
        <View style={[generalStyles.centerContent, { marginTop: 20 }]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Register")}
            style={[generalStyles.centerContent, { flexDirection: 'row' }]}
          >
            <Text style={generalStyles.CardTitle}>Already have an account? </Text>
            <Text style={generalStyles.forgotText}>
              {'Login'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* already have an account login */}
        {/* register */}

        {/* skip for now */}
        {/* add skip  word */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => dispatch(skipFirstLogin())}
          style={[generalStyles.centerContent, { flexDirection: 'row' }]}
        >
          <Text style={[generalStyles.forgotText, { marginTop: 10 }]}>Skip for now</Text>
        </TouchableOpacity>
        {/* add skip  word */}
        {/* skip for now */}


        {loading && <ActivityIndicator />}
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  icon: {
    marginLeft: -40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  viewStyles: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 15
  },
  phoneInput: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily: FONTFAMILY.roboto_regular
  },
  countryButton: {
    marginBottom: 20,
  },
  countryPickerButton: {
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  countryPickerCloseButton: {
    width: 20,
    height: 20,
  },
  submitButton: {
    width: '100%',
  },
  textInputMarginRight: {
    marginRight: 15
  },
  iconStyles: {
    position: 'absolute',
    right: 10
  },

})