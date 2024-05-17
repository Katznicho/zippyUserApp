import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { usePostQuery } from '../hooks/usePostQuery';
import { generalStyles } from '../screens/utils/generatStyles';
import UserWallet from './UserWallet';
import { SAVE_DEVICE_INFO } from '../screens/utils/constants/routes';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';

const CheckUserWallet = () => {
    const { user, authToken } = useSelector((state: RootState) => state.user);

    //user device and push token
    useEffect(() => {
        (async () => {
            try {
                let deviceId = DeviceInfo.getDeviceId();
                let model = DeviceInfo.getModel();
                const manufacture = await DeviceInfo.getManufacturer();
                let readableVersion = DeviceInfo.getReadableVersion();
                let systemName = DeviceInfo.getSystemName();
                let systemVersion = DeviceInfo.getSystemVersion();
                const userAgent = await DeviceInfo.getUserAgent();
                let type = DeviceInfo.getDeviceType();
                const devicePushToken = await messaging().getToken();

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
                console.log(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);

        const body = new FormData();
        body.append('push_token', push_token);
        body.append('device_id', device_id);
        body.append('device_model', device_model);
        body.append('device_manufacturer', device_manufacturer);
        body.append('app_version', app_version);
        body.append('device_os', device_os);
        body.append('device_os_version', device_os_version);
        body.append('device_user_agent', device_user_agent);
        body.append('device_type', device_type);


        fetch(`${SAVE_DEVICE_INFO}`, {
            headers,
            method: 'POST',
            body,
        })
            .then(a => a.json())
            .then(result => {
                // console.log(result)

            })
            .catch(error => {
            });
    }

    //user devices and push token
    const navigation = useNavigation<any>();
    const { data, error, isLoading, } = usePostQuery<any>({
        endpoint: '/auth/hasWalletAccount',
        params: {
            "account": "hasWalletAccount"
        },
        queryOptions: {
            enabled: true,
            refetchInterval: 2000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    })
    return (
        <View>
            {/* wallet button */}
            {
                data?.response == "failure" && (<TouchableOpacity
                    activeOpacity={1}
                    onPress={() => navigation.navigate('CreateWallet')}
                    style={generalStyles.loginContainer}
                >
                    <Text style={generalStyles.loginText}>{'Add Wallet'}</Text>
                </TouchableOpacity>)
            }
            {/* wallet button */}
            {
                data?.response == "success" && (<UserWallet />)
            }
        </View>
    )
}

export default CheckUserWallet

const styles = StyleSheet.create({})