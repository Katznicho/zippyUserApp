import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Linking, Alert, Platform } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useRoute } from '@react-navigation/native'
import { generalStyles } from './utils/generatStyles'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import QRCode from 'react-native-qrcode-svg';
import { onMakeCall } from './utils/helpers/helpers'
import { showAuthScreen } from '../redux/store/slices/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store/dev'
import { CREATE_BOOKING } from './utils/constants/routes'
import { showMessage } from 'react-native-flash-message'
import { ActivityIndicator } from '../components/ActivityIndicator'
import ArrowBack from '../components/ArrowBack'
import Entypo from 'react-native-vector-icons/Entypo'



const StationDetails = () => {

    const navigation = useNavigation<any>();

    const { data } = useRoute<any>().params;

    const { guestUser, authToken } = useSelector((state: RootState) => state.user);

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
                    console.log(result)
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
                    console.log(error)
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
                        <View>
                            <Text style={styles.CardTitle}>{data?.name}</Text>
                            <View style={[generalStyles.flexStyles]}>
                                <Entypo name="location-pin"
                                    size={15}
                                    color={"#ff5b6e"}
                                    style={{ marginLeft: -5 }}
                                />
                                <Text style={styles.CardSubtitle}>{data?.location}</Text>

                            </View>

                        </View>
                        <View>
                            <QRCode value={data?.zippy_id}
                                size={40}
                            />

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
                                    style={[generalStyles.loginContainer, { width: "100%" }]}
                                    onPress={() => handleBookNow()}
                                >
                                    <Text style={generalStyles.loginText}>{'Book Now'}</Text>
                                </TouchableOpacity>
                            </View>
                            {/* book now button */}
                        </View>

                    </View>

                    {/* category and book now */}
                    <View>
                        <View>
                            <Text style={styles.CardTitle} >Location</Text>
                            <Text style={styles.CardSubtitle}>{data?.location}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Payment Period</Text>
                            <Text style={styles.CardSubtitle}>{data?.payment_period?.name}</Text>
                        </View>

                    </View>

                    <View>
                        <View>
                            <Text style={styles.CardTitle} >Price</Text>
                            <Text style={styles.CardSubtitle}>{data?.currency?.name} {data?.price}</Text>
                        </View>


                    </View>

                    {/* actions and total bookings */}

                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]} >
                        <View>
                            <Text style={styles.CardTitle} >Total Bookings</Text>
                            <Text style={styles.CardSubtitle}>0</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Scan Me</Text>
                            {/* actions area */}
                            <QRCode value={data?.zippy_id}
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
                            <Text style={styles.CardTitle} >Status</Text>
                            <Text style={styles.CardSubtitle}>{data?.status?.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Zippy ID</Text>
                            <Text style={styles.CardSubtitle}>{data?.zippy_id}</Text>
                        </View>

                    </View>

                    <View >
                        <View>
                            <Text style={styles.CardTitle} >Description</Text>
                            <Text style={styles.CardSubtitle}>{data?.description}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Year Built</Text>
                            <Text style={styles.CardSubtitle}>{data?.year_built}</Text>
                        </View>

                    </View>

                    <View >
                        <View>
                            <Text style={styles.CardTitle} >Furnishing Status</Text>
                            <Text style={styles.CardSubtitle}>{data?.furnishing_status}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Property Size</Text>
                            <Text style={styles.CardSubtitle}>{data?.property_size}</Text>
                        </View>

                    </View>


                    <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]} >
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
                    <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />

                    {/* public facilties */}
                    <View >
                        <View>
                            <Text style={styles.CardTitle} >Public facilties</Text>
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
                    <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
                    {/* public facilties */}

                    {/* owner details */}

                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]} >
                        <View>
                            <Text style={styles.CardTitle} >Owner</Text>
                            <Text style={styles.CardSubtitle}>{data?.owner?.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Phone Number</Text>
                            <Text style={styles.CardSubtitle}>{data?.owner?.phone_number}</Text>
                        </View>

                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[generalStyles.loginContainer, { marginTop: 0, padding: 10 }]}
                        onPress={() => onMakeCall(data?.owner?.phone_number)}>
                        <Text style={generalStyles.loginText}>{'Call Owner'}</Text>
                    </TouchableOpacity>
                    {/* owner details */}
                </View>
                {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={COLORS.primaryWhiteHex} />}
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default StationDetails

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
        fontFamily: FONTFAMILY.roboto_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.roboto_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
        // marginHorizontal: SPACING.space_10
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