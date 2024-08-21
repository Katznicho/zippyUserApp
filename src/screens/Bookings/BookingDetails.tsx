import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Linking, Alert } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useRoute } from '@react-navigation/native'
import QRCode from 'react-native-qrcode-svg';
import { generalStyles } from '../utils/generatStyles';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { showAuthScreen } from '../../redux/store/slices/UserSlice';
import ArrowBack from '../../components/ArrowBack';
import { showMessage } from 'react-native-flash-message';




const BookingDetails = () => {

    const navigation = useNavigation<any>();

    const { data } = useRoute<any>().params;

    const { guestUser, authToken } = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch<any>();

    const [loading, setLoading] = useState<boolean>(false);




    const openMapsForDirections = () => {
        const destination = `${data?.lat},${data?.long}`;
        
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        return Linking.openURL(url);
    };

    const handleShowAlert = () => {
        Alert.alert(
            'Login',
            "You need to login first to continue",
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

    const handleCancelRequest = () => {
        if (guestUser) {
            handleShowAlert()
        } else {
            setLoading(true)
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${authToken}`);

            const body = new FormData();
            body.append("property_id", data?.id);
            body.append("total_price", data?.price);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body,
            };

             showMessage({
                message:"Cancel Request Sent",
                type:"success",
                icon:"success",
                duration:3000,
                position:"bottom"
            })
            return navigation.goBack()



        }
    }



    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{ paddingBottom: 100 }}
        >

            <ScrollView
                showsVerticalScrollIndicator={false}
                // contentContainerStyle={{ paddingBottom: tabBarHeight }}
                keyboardShouldPersistTaps="always"
            >
                {/* show background image */}
                <ImageBackground
                    source={{ uri: `${data?.property?.cover_image}` }}
                    style={styles.dataBackgroundImage}
                >
                    {/* back handler */}
                    <View style={styles.ImageHeaderBarContainerWithBack}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                navigation.goBack()
                            }}>
                            <ArrowBack/>
                        </TouchableOpacity>


                    </View>

                    {/* back handler */}

                    {/* more details */}
                    {/* book now button */}

                    {/* more details */}
                </ImageBackground>
                {/* show background */}
                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[generalStyles.loginContainer, {
                            marginTop: 5,
                        }]}
                        onPress={() => openMapsForDirections()}
                    >
                        <Text style={generalStyles.loginText}>{'Take me there'}</Text>
                    </TouchableOpacity>

                    <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />

                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]}>
                        <View>
                            <Text style={styles.CardTitle} >Name</Text>
                            <Text style={styles.CardSubtitle}>{data?.property?.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Distance</Text>

                        </View>

                    </View>
                    {/* category and book now */}
                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]}>
                        <View>
                            <Text style={styles.CardTitle} >Category</Text>
                            <Text style={styles.CardSubtitle}>{data?.category?.name}</Text>
                        </View>
                        <View>
                            {/* <Text style={styles.CardTitle} >Distance</Text> */}
                            {/* book now button */}
                            <View>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[generalStyles.loginContainer, { width: "100%", backgroundColor:COLORS.primaryRedHex }]}
                                    onPress={() => handleCancelRequest()}
                                >
                                    <Text style={generalStyles.loginText}>{'Cancel Now'}</Text>
                                </TouchableOpacity>
                            </View>
                            {/* book now button */}
                        </View>

                    </View>

                    {/* category and book now */}
                    <View>
                        <View>
                            <Text style={styles.CardTitle} >Location</Text>
                            <Text style={styles.CardSubtitle}>{data?.property?.location}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Payment Period</Text>
                            <Text style={styles.CardSubtitle}>{data?.property?.payment_period?.name}</Text>
                        </View>

                    </View>

                    <View>
                        <View>
                            <Text style={styles.CardTitle} >Price</Text>
                            <Text style={styles.CardSubtitle}>{data?.property?.currency?.name} {data?.property?.price}</Text>
                        </View>


                    </View>

                    {/* actions and total bookings */}

                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]} >

                        <View>
                            <Text style={styles.CardTitle} >Scan Me</Text>
                            {/* actions area */}
                            <QRCode value={data?.property?.zippy_id}
                                size={50}
                            />
                            {/* actions area */}
                        </View>

                    </View>
                    {/* actions and total bookings */}

                    <View >
                        <View>
                            <Text style={styles.CardTitle} >Total Bedrooms</Text>
                            <Text style={styles.CardSubtitle}>{data?.number_of_beds}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Total Bathrooms</Text>
                            <Text style={styles.CardSubtitle}>{data?.number_of_baths}</Text>
                        </View>

                    </View>
                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]}>

                        <View>
                            <Text style={styles.CardTitle} >Zippy ID</Text>
                            <Text style={styles.CardSubtitle}>{data?.property?.zippy_id}</Text>
                        </View>

                    </View>




                    <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]} >
                        <View>
                            <Text style={styles.CardTitle} >Services</Text>
                            {/* <Text style={styles.CardSubtitle}>{data?.is_approved ? 'Yes' : "No"}</Text> */}
                            {
                                data?.property?.services?.map((service: any, index: number) => {
                                    return (
                                        <Text style={styles.CardSubtitle} key={index}>{service?.name}</Text>
                                    )
                                })
                            }
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Amentities</Text>
                            {
                                data?.properrty?.amenities?.map((amentity: any, index: number) => {
                                    return (
                                        <Text style={styles.CardSubtitle} key={index}>{amentity?.name}</Text>
                                    )
                                })
                            }
                        </View>

                    </View>
                    <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />

                    {/* public facilties */}
                    <View >
                        <View>
                            <Text style={styles.CardTitle} >Public facilties</Text>
                            {/* <Text style={styles.CardSubtitle}>{data?.is_approved ? 'Yes' : "No"}</Text> */}
                            {
                                data?.property?.public_facilities?.map((facility: any, index: number) => {
                                    return (
                                        <Text style={styles.CardSubtitle} key={index}>{facility}</Text>
                                    )
                                })
                            }
                        </View>


                    </View>
                    <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
                    {/* public facilties */}

                </View>
                {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={COLORS.primaryWhiteHex} />}
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default BookingDetails

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 10,
        padding: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        margin: 5,
        // marginHorizontal: 5
    },
    hairLineStyles: {
        width: "80%",
        // marginHorizontal: 40,
        marginVertical: 10
    },
    CardTitle: {
        fontFamily: FONTFAMILY.roboto_regular,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.roboto_regular,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
        // marginHorizontal: SPACING.space_10
    },
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dataBackgroundImage: {
        width: '100%',
        aspectRatio: 25 / 15,
        justifyContent: 'space-between',
    },
    // Add a style for the map
    map: {
        height: 300,
        marginVertical: 10,
    },
    spacingStyles: {
        marginHorizontal: 5,
        // marginVertical: 5
    },
})