import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/theme';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { showMessage } from 'react-native-flash-message';
import { skipFirstLogin, updateUserState } from '../../redux/store/slices/UserSlice';
import { useDispatch } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { generalStyles } from '../utils/generatStyles';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_OR_REGISTER_WITH_EMAIL, LOGIN_OR_REGISTER_WITH_GOOGLE, LOGIN_OR_REGISTER_WITH_PHONE } from '../utils/constants/routes';

GoogleSignin.configure({
  webClientId: '126014043646-kclsfvqmc7lsjags2iogk2dmga7aahqj.apps.googleusercontent.com', // From Firebase Console
});

const Login = () => {
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const phoneInput = useRef(null);
  const [provider,  setProvider] =  useState<string>("phoneNumber");
  const navigation = useNavigation<any>();

  const [errors, setErrors] = useState<any>({
    email: '',
    phoneNumber:"",
  });


  const onGoogleButtonPress = async () => {
   try {
    setProvider("google");
    // Google sign-in logic here
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // Decode the ID token
        const decodedToken = jwtDecode(googleCredential.token);
    
      
    
        const userDetails = {
          email: decodedToken?.email,
          name: decodedToken?.name,
          picture: decodedToken?.picture,
          googleId: decodedToken?.sub,
          first_name: decodedToken?.family_name,
          last_name: decodedToken?.given_name,
          provider:"google"
        };

        const body = new FormData();

        body.append('email', userDetails.email);
        body.append('name', userDetails.name);
        body.append('picture', userDetails.picture);
        body.append('googleId', userDetails.googleId);
        body.append('first_name', userDetails.first_name);
        body.append('last_name', userDetails.last_name);
        body.append('provider', userDetails.provider);
        body.append('phone', '');

        setLoading(true)

        const headers = new Headers();
        headers.append('Accept', 'application/json');

        fetch(`${LOGIN_OR_REGISTER_WITH_GOOGLE}`, {
          method: 'POST',
          headers,
          body,
        })
          .then(response => response.json())
          .then(async result => {
            console.log(result)
            if (result.response === "success") {
              setLoading(false);
              // dispatch(updateUserState(result.data));
              let name = result?.data?.user?.name || '';
                    let firstName = name.split(' ')[0] || null;
                    let lastName = name.split(' ')[1] || null;

                    let email = result?.data?.user?.email || null
                    let dob = result?.data?.user?.dob || null
                    let phone = result?.data?.user?.phone_number || null

                    let isSetupComplete =  phone != null ? true : false
                    // console.log("isSetupComplete", isSetupComplete)

                    dispatch(
                        updateUserState({
                            isLoggedIn: true,
                            guestUser: false,
                            isSetupComplete:false,
                            user: {
                                UID: result?.data?.user?.id || null,
                                fname: firstName,
                                lname: lastName,
                                email: result?.data?.user?.email || null,
                                phone: result?.data?.user?.phone_number || null,
                                displayPicture: result?.data?.user?.avatar || null,
                                role: result?.data?.user?.role || null,
                                points: result?.data?.user?.points || null
                            },
                            authToken: result?.data?.authToken,
                            
                        })
                    );
                    return await AsyncStorage.setItem('token', result?.data.authToken);
            }
            else {
              setLoading(false);
              return showMessage({
                message: "Request Failed",
                description: "Please try again",
                type: "info",
                icon: "info",
              })
            }
          }).catch(error => {
            setLoading(false);
            return showMessage({
              message: "Request Failed",
              description: "Please try again",
              type: "info",
              icon: "info",
            })
          })
    
    
   } catch (error) {

     setLoading(false)
     return showMessage({
       message: "Request Failed",
       description: "Please try again",
       type: "info",
       icon: "info",
     })
    
   }
  };

  const onFacebookPress =  async  ()=>{
    return Alert.alert('Facebook is supported on your device')
  }

  const onApplePress  = async ()=>{
    return Alert.alert("Apple is not supported on your device");
  }

  //loginOrRegister
  const onPressLogin = async () => {

    try {
      if(provider === "phoneNumber"){
        if (phoneNumber == "") {
           showMessage({
             message: "Error",
             description: "Phone number is required",
             type: "info",
             autoHide: false,
             position: "center",
             duration: 3000,
             icon: "danger"
           })
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

        //login or register
        setLoading(true)

        const headers = new Headers();
        headers.append('Accept', 'application/json');
        const body = new FormData();
        body.append('phone_number', phoneNumber); 
        fetch(`${LOGIN_OR_REGISTER_WITH_PHONE}`, {
          method: 'POST',
          headers,
          body,
        }).then(response => response.json())
          .then(async result => {
            console.log("phone result")
             console.log(result)

             setLoading(false)
            if (result?.errors) {
              setErrors(result.errors);
              showMessage({
                message: "Error",
                description: "Invalid phone number or password",
                type: "info",
                autoHide: true,
                duration: 3000,
                icon: "danger"
              })
              setLoading(false)
              return;
            }

            if (result.response === 'failure') {
              setErrors({
                // email: [result?.message],
                // password: [result?.message],

              });
              showMessage({
                message: "Error",
                description: "Invalid phone number or password",
                type: "info",
                autoHide: true,
                duration: 3000,
                icon: "danger"
              })
              setLoading(false)
              return;
            }

            if (result.response === 'success') {
              setLoading(false)
              showMessage({
                message: "Success",
                description: "Verify phone number",
                type: "success",
                autoHide: true,
                duration: 3000,
                icon: "success"
              })
              return navigation.navigate('VerifyPhoneNumber', { phoneNumber: phoneNumber, provider: provider });
            }
              // dispatch(updateUserState(result?.user));
          }).catch(error => {

            setLoading(false)
            return showMessage({ message: "Error", description: error, type: "info", autoHide: true, duration: 3000, icon: "danger" })
          })
        //login or register
      }
      else if(provider === "google"){}
      else if(provider === "facebook"){}
      else if(provider === "apple"){}
      else if(provider === "email"){
         if(email == ""){
          setErrors((prevErrors: any) => ({
            ...prevErrors,
            email: "Email is required"
          }))
         }
         else{
          setErrors((prevErrors: any) => ({
            ...prevErrors,
            email: ""
          }))
         }
          
         setLoading(true)

         const headers = new Headers();
         headers.append('Accept', 'application/json');
         const body = new FormData();
         body.append('email', email); 

         //login or register with email
         fetch(`${LOGIN_OR_REGISTER_WITH_EMAIL}`, {
          method: 'POST',
          headers,
          body,
         }).then(response => response.json())
          .then(async result => {
             setLoading(false)
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
              setLoading(false)
              return;
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
              setLoading(false)
              return;
            }

            if (result.response === 'success') {
              setLoading(false)
              showMessage({
                message: "Success",
                description: "Verify email",
                type: "success",
                autoHide: true,
                duration: 3000,
                icon: "success"
              })
              return navigation.navigate('VerifyEmail', { email: email, provider: provider });
            }
              // dispatch(updateUserState(result?.user));
            
          }).catch(error => {
            setLoading(false)
            return showMessage({ message: "Error", description: error, type: "info", autoHide: true, duration: 3000, icon: "danger" })
          })
         //login or register with email
      }
      else{

      }
      
    } catch (error) {
      setLoading(false)
      return showMessage({
        message: "Error",
        description: "Failed Please try again",
        type: "info",
        autoHide: true,
        duration: 3000,
        icon: "danger"
      })
      
    }

  }
  //loginOrRegister

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        

        
      >
        {/* center logo */}
        <View style={[generalStyles.centerContent, { marginVertical: 20 }]}>
          <Text style={[generalStyles.authTitle, { fontSize: 15, color:"black" }]}>
            Log in or sign up to Zippy Real Estates
          </Text>


        </View>
        {/* center logo */}

        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/zippy.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity 
        style={styles.skipButton}
        onPress={() => dispatch(skipFirstLogin())}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          {showEmailInput ? (
            <>
              <View style={generalStyles.formContainer}>
          <View>
          </View>

          <TextInput
            style={[generalStyles.formInput, generalStyles.borderStyles,  errors.email && generalStyles.errorInput]}
            placeholder={'Email'}
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
              
            </>
          ) : (
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="UG"
              layout="first"
              onChangeFormattedText={(text) => {
                setPhoneNumber(text);
              }}
              placeholder="Phone number"
              containerStyle={styles.phoneInputContainer}
              textContainerStyle={styles.phoneTextInputContainer}
            />
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.continueButton}
          onPress={onPressLogin}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.separator}>
          <Text style={styles.separatorText}>or</Text>
        </View>

       {
         !showEmailInput ?
         <TouchableOpacity
         style={styles.socialButton}
         onPress={() => {
          setShowEmailInput(!showEmailInput)
          return setProvider("email")

         }}
       >
         <Image source={require('../../assets/app_images/email.png')} style={styles.socialIcon} />
         <Text style={styles.socialButtonText}>Continue with Email</Text>
       </TouchableOpacity>
         :         <TouchableOpacity
         style={styles.socialButton}
         onPress={() => {
          setShowEmailInput(!showEmailInput)
          return setProvider("phoneNumber")

         }}
       >
         <Image source={require('../../assets/app_images/phone.png')} style={styles.socialIcon} />
         <Text style={styles.socialButtonText}>Continue with Phone Number</Text>
       </TouchableOpacity>
       }


        <TouchableOpacity
          style={styles.socialButton}
          onPress={onGoogleButtonPress}
        >
          <Image source={require('../../assets/app_images/google.jpeg')} style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => onFacebookPress()}
        >
          <Image source={require('../../assets/app_images/facebook.png')} style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() =>onApplePress()}
        >
          <Image source={require('../../assets/app_images/apple.png')} style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>By continuing, you agree to the Terms and Conditions.</Text>

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
  logoContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  skipButton: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  skipButtonText: {
    color: COLORS.primaryOrangeHex,
    fontSize: 16,
  },
  formContainer: {
    marginVertical: 20,
  },
  phoneInputContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  phoneTextInputContainer: {
    paddingVertical: 0,
    backgroundColor: '#f5f5f5',
  },
  emailInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
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
  separator: {
    alignItems: 'center',
    marginVertical: 10,
  },
  separatorText: {
    color: '#aaa',
    fontSize: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#333',
  },
  termsText: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 14,
    marginTop: 20,
  },
});

export default Login;
//