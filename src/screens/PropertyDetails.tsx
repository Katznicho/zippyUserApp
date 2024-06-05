import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Linking, Alert, Platform, Image } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useRoute } from '@react-navigation/native'
import { generalStyles } from './utils/generatStyles'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import QRCode from 'react-native-qrcode-svg';
import { calculateDistance, formatCurrency, onMakeCall } from './utils/helpers/helpers'
import { showAuthScreen } from '../redux/store/slices/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store/dev'
import { CREATE_BOOKING } from './utils/constants/routes'
import { showMessage } from 'react-native-flash-message'
import { ActivityIndicator } from '../components/ActivityIndicator'
import ArrowBack from '../components/ArrowBack'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import useGetUserLocation from '../hooks/useGetUserLocation'



const StationDetails = () => {

    const navigation = useNavigation<any>();

    const { data } = useRoute<any>().params;

    const { guestUser, authToken } = useSelector((state: RootState) => state.user);
    // const {position} = usePo
    const { position } = useGetUserLocation();

    const dispatch = useDispatch<any>();

    const [loading, setLoading] = useState<boolean>(false);






    const openMapsForDirections = () => {
        const destination = `${data?.lat},${data?.long}`;
        // console.log(destination)
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

    const handleBookNow = () => {
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

            fetch(`${CREATE_BOOKING}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    showMessage({
                        message: "Booked Successfully",
                        description: "We will get back to you soon",
                        type: "success",
                        icon: "success",
                    });
                    setLoading(false)
                    return navigation.navigate("Bookings")
                })
                .catch((error) => {
                    setLoading(false)
                    showMessage({
                        message: "Booked Failed",
                        description: "Please try again",
                        type: "info",
                        icon: "info",
                    });

                });

        }
    }


    const handleRequestCall = () => {
        try {
            setLoading(true)
            showMessage({
                message: "Request Sent",
                description: "We will get back to you soon",
                type: "success",
                icon: "success",
            });
            setLoading(false)
            return navigation.navigate("HomeTab")

        } catch (error) {

            setLoading(false)
            return showMessage({
                message: "Request Failed",
                description: "Please try again",
                type: "info",
                icon: "info",
            })

        }
    }




    return (
        <View
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
        >

            <ScrollView
                showsVerticalScrollIndicator={false}
                // contentContainerStyle={{ paddingBottom: tabBarHeight }}
                keyboardShouldPersistTaps="always"
                style={{ paddingBottom: 50 }}
            >
                {/* show background image */}
                <ImageBackground
                    source={{ uri: `${data?.cover_image}` }}
                    style={styles.dataBackgroundImage}
                >
                    {/* back handler */}
                    <View style={styles.ImageHeaderBarContainerWithBack}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                navigation.goBack()
                            }}>
                            <ArrowBack />
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
                        <View style={{ flex: 1 }}>
                            <Text style={styles.CardTitle}>{data?.name}</Text>
                            <View style={[generalStyles.flexStyles]}>
                                <Entypo name="location-pin"
                                    size={15}
                                    color={"#ff5b6e"}
                                    style={{ marginLeft: -5 }}
                                />
                                <Text style={styles.CardSubtitle}>{data?.location}</Text>

                            </View>
                            <View style={[generalStyles.flexStyles]}>
                                <Entypo name="location-pin"
                                    size={15}
                                    color={"#ff5b6e"}
                                    style={{ marginLeft: -5 }}
                                />
                                <Text style={[generalStyles.CardTitle, { fontSize: FONTSIZE.size_10 }]}>
                                    {calculateDistance(position?.latitude, position?.longitude, data.lat, data.long)}
                                    km(s) from you
                                </Text>

                            </View>
                            <View style={[generalStyles.flexStyles, { paddingVertical: 5 }]}>
                                <AntDesign
                                    name="star"
                                    size={12}
                                    color={"#FCB72B"}
                                    style={{ marginLeft: -5 }}
                                />
                                <Text style={styles.CardSubtitle}>{'4.6'}(103) reviews</Text>

                            </View>


                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <QRCode
                                value={data?.zippy_id}
                                size={40}
                            />
                            <View style={[generalStyles.flexStyles, { paddingVertical: 5 }]}>
                                <Text style={styles.CardSubtitle}>{data?.number_of_beds} bedroom(s)</Text>
                                <Text style={styles.CardSubtitle}>{data?.number_of_baths} bathroom(s)</Text>

                            </View>
                        </View>

                    </View>
                    {/* category and book now */}
                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center", marginVertical: 10 }]}>
                        <View style={[generalStyles.flexStyles, { alignItems: "center" }]}>
                            <Image
                                source={{ uri: "https://plus.unsplash.com/premium_photo-1658506615399-d1280310ad6c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFmcmljYW4lMjBwcm9wZXJ0eSUyMGFnZW50fGVufDB8fDB8fHww" }}
                                style={styles.imageStyles}

                            />
                            <View style={{ marginHorizontal: 5 }}>
                                <Text style={[styles.CardTitle, {}]} >{data.agent.name}</Text>
                                <Text style={styles.CardSubtitle}>{'Property Agent'}</Text>
                            </View>

                        </View>
                        <View>
                            {/* <Text style={styles.CardTitle} >Distance</Text> */}
                            {/* book now button */}
                            <View>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[generalStyles.loginContainer, { width: "100%", marginTop: 0 }]}
                                    onPress={() => handleRequestCall()}
                                >
                                    <Text style={generalStyles.loginText}>{'Request Call'}</Text>
                                </TouchableOpacity>
                            </View>
                            {/* book now button */}
                        </View>

                    </View>

                    {/* category and book now */}
                    {/* <View>

                        <View>
                            <Text style={styles.CardTitle} >Payment Period</Text>
                            <Text style={styles.CardSubtitle}>{data?.payment_period?.name}</Text>
                        </View>

                    </View> */}

                    {/* <View>
                        <View>
                            <Text style={styles.CardTitle} >Price</Text>
                            <Text style={styles.CardSubtitle}>{data?.currency?.name} {data?.price}</Text>
                        </View>


                    </View> */}



                    <View>
                        <View>
                            <Text style={styles.CardTitle} >Services</Text>
                            {/* <Text style={styles.CardSubtitle}>{data?.is_approved ? 'Yes' : "No"}</Text> */}
                            {
                                data?.services?.map((service: any, index: number) => {
                                    return (
                                        <Text style={styles.CardSubtitle} key={index}>{service?.name}</Text>
                                    )
                                })
                            }
                        </View>
                    </View>

                    {/* amentities */}
                    <View style={{ marginTop: 10 }}>
                        <View>
                            <Text style={styles.CardTitle} >Amentities</Text>
                            {
                                data?.amenities?.map((amentity: any, index: number) => {
                                    return (
                                        <Text style={styles.CardSubtitle} key={index}>{amentity?.name}</Text>
                                    )
                                })
                            }
                        </View>
                    </View>
                    {/* amentities */}
                    {/* public facilties */}
                    <View style={{ marginVertical: 10 }}>
                        <View>
                            <Text style={styles.CardTitle} >Nearest Public facilties</Text>
                            {/* <Text style={styles.CardSubtitle}>{data?.is_approved ? 'Yes' : "No"}</Text> */}
                            {
                                data?.public_facilities?.map((facility: any, index: number) => {
                                    return (
                                        <Text style={styles.CardSubtitle} key={index}>{facility}</Text>
                                    )
                                })
                            }
                        </View>


                    </View>

                    <View>
                        <Text style={styles.CardTitle} >About Property</Text>
                        <Text style={styles.CardSubtitle}>{data?.description}</Text>
                    </View>


                </View>
                {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={COLORS.primaryWhiteHex} />}

            </ScrollView>
            {/* Fixed bottom bar */}
            <View style={styles.fixedBottomBar}>
                <Text style={styles.priceText}>{data?.currency?.name} {formatCurrency(data?.price)}</Text>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[generalStyles.loginContainer, styles.bookNowButton]}
                    onPress={() => handleBookNow()}
                >
                    <Text style={generalStyles.loginText}>{'Book Now'}</Text>
                </TouchableOpacity>
            </View>
            {/* fixed bottom */}

        </View >
    )
}

export default StationDetails

const styles = StyleSheet.create({
    cardContainer: {
        // backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 10,
        padding: 10,
        // shadowColor: 'rgba(0, 0, 0, 0.1)',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 1,
        // shadowRadius: 4,
        // elevation: 5,
        // margin: 5,
        // marginHorizontal: 5
    },
    hairLineStyles: {
        width: "80%",
        // marginHorizontal: 40,
        marginVertical: 10
    },
    textPadding: {
        padding: 5,
        fontSize: 18
    },
    CardTitle: {
        fontFamily: FONTFAMILY.roboto_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
        // padding: 5
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.roboto_regular,
        color: COLORS.primaryLightGreyHex,
        fontSize: FONTSIZE.size_10,
        // padding: 5
    },
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Platform.OS === "ios" ? 10 : 0
    },
    dataBackgroundImage: {
        width: '100%',
        aspectRatio: 25 / 15,
        justifyContent: 'space-between',
    },
    imageStyles: {
        width: 35,
        height: 35,
        borderRadius: 20,
        // resizeMode: "contain",
        // borderRadius: 10
    },
    fixedBottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bookNowButton: {
        width: '40%',
        marginTop: 0,
    },

})