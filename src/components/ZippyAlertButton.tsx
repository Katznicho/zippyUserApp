import { Text, View, TouchableOpacity, Alert, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { generalStyles } from '../screens/utils/generatStyles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store/dev'
import { showAuthScreen } from '../redux/store/slices/UserSlice'

const ZippyAlertButton = () => {
    const navigation = useNavigation<any>()

    const { guestUser } = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch<any>()

    const handleShowAlert = () => {
        Alert.alert(
            'Login',
            "You need to login first to see this screen",
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
            { cancelable: false },
        )
    }

    return (
        <View style={[{ marginHorizontal: 10,marginTop:Platform.OS == "ios"? 10:0  }]}>
            <TouchableOpacity
                activeOpacity={1}
                style={[generalStyles.loginContainer, { width: "100%" }]}
                onPress={() => guestUser ? handleShowAlert() : navigation.navigate('ZippyAlert')}
            >
                <Text style={generalStyles.loginText}>{'Create Zippy Alert'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ZippyAlertButton

