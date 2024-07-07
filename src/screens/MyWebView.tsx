import { Text, View, SafeAreaView, Button } from 'react-native'
import React, { useRef } from 'react'
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import { showMessage } from 'react-native-flash-message';
import { generalStyles } from './utils/generatStyles';
import { ActivityIndicator } from '../components/ActivityIndicator';



const MyWebView = () => {
    const { params } = useRoute<any>();
    const navigation = useNavigation<any>();


    console.log("================params======================")
    console.log(params.url)
    console.log("===============params=======================")


    const webRef = useRef<any>();

    const handleNavigationStateChange = (event: any) => {
        console.log("======================================")
        console.log(event)
        console.log("======================================")

        if (event.title == 'dashboard.zippyug.com/finishPayment' || event.url === 'https://dashboard.zippyug.com/finishPayment' || event.url.includes('https://dashboard.zippyug.com/finishPayment')) {
            showMessage({
                message: 'Pending Payment',
                description: 'Your payment is pending',
                type: 'success',
                icon: 'success'
            })
            return navigation.navigate('Payments');
        }


    }
    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>


            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginTop: 10
            }}>
                <Text style={[generalStyles.ScreenTitle, { fontSize: 18 }]}>Please Choose Payment Method</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5, marginHorizontal: 10 }}>

                <Button title="Reload"
                    onPress={() => webRef.current?.reload()}
                    color={COLORS.primaryOrangeHex}
                />

                <Button title="Home"
                    onPress={() => navigation.navigate('Payments')}
                    color={COLORS.primaryOrangeHex}
                />

                {/* back to home screen */}

            </View>


            <WebView
                ref={webRef}
                source={{ uri: params?.url }}
                onNavigationStateChange={handleNavigationStateChange}
                style={{ flex: 1 }}
                allowFileAccess
                containerStyle={{ flex: 1, backgroundColor: 'white', paddingBottom: 100 }}
                startInLoadingState
                renderLoading={() => {
                    return <View style={{ flex: 1, }}>
                        <ActivityIndicator />
                    </View>
                }}
            />
        </SafeAreaView >
    )
}

export default MyWebView

