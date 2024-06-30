import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Linking,
    Alert,
    Platform,
    Image,
    Dimensions
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { generalStyles } from './utils/generatStyles';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import QRCode from 'react-native-qrcode-svg';
import {
    calculateDistance,
    formatCurrency,
    onMakeCall
} from './utils/helpers/helpers';
import { showAuthScreen } from '../redux/store/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';
import { CREATE_BOOKING } from './utils/constants/routes';
import { showMessage } from 'react-native-flash-message';
import { ActivityIndicator } from '../components/ActivityIndicator';
import ArrowBack from '../components/ArrowBack';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useGetUserLocation from '../hooks/useGetUserLocation';
import Collapsible from 'react-native-collapsible';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FourReviews from '../components/FourReviews';

const { height, width } = Dimensions.get('window');

const PropertyDetails = () => {
    const navigation = useNavigation<any>();
    const { data } = useRoute<any>().params;
    const { guestUser, authToken } = useSelector((state: RootState) => state.user);
    const { position } = useGetUserLocation();
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const openMapsForDirections = () => {
        const destination = `${data?.lat},${data?.long}`;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        return Linking.openURL(url);
    };

    const [liked, setLiked] = useState<boolean>(false);

    const [servicesCollapsed, setServicesCollapsed] = useState<boolean>(true);
    const [amenitiesCollapsed, setAmenitiesCollapsed] = useState<boolean>(true);
    const [publicCollapsed, setPublicCollapsed] = useState<boolean>(true);

    const handleLike = () => {

        if (guestUser) {
            //  return dispatch(showAuthScreen())
            return handleShowAlert();
        }
        if (!liked) {
            return Alert.alert(
                'Like ' + data?.name,
                'Are you sure you want to like this ' + data?.name,
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            setLiked(!liked)
                            return showMessage({
                                message: 'Liked Successfully',
                                type: 'success',
                                icon: 'success',
                                duration: 3000,
                                autoHide: true,
                                position: 'bottom'
                            })

                        }
                    }
                ],
                { cancelable: false }
            )

        }
        else {
            return Alert.alert(
                'Dislike ' + data?.name,
                'Are you sure you want to dislike this ' + data?.name,
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            setLiked(!liked)
                            return showMessage({
                                message: 'Disliked Successfully',
                                type: 'success',
                                icon: 'success',
                                duration: 3000,
                                autoHide: true,
                                position: 'bottom'
                            })

                        }
                    }
                ],
                { cancelable: false }
            )
        }

    }
    const handleShowAlert = () => {
        Alert.alert(
            'Login',
            'You need to login first to continue',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => dispatch(showAuthScreen(true))
                }
            ],
            { cancelable: false }
        );
    };

    const handleBookNow = () => {
        if (guestUser) {
            handleShowAlert();
        } else {
            setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${authToken}`);

            const body = new FormData();
            body.append('property_id', data?.id);
            body.append('total_price', data?.price);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body
            };

            fetch(`${CREATE_BOOKING}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    showMessage({
                        message: 'Booked Successfully',
                        description: 'We will get back to you soon',
                        type: 'success',
                        icon: 'success'
                    });
                    setLoading(false);
                    return navigation.navigate('Bookings');
                })
                .catch(error => {
                    setLoading(false);
                    showMessage({
                        message: 'Booked Failed',
                        description: 'Please try again',
                        type: 'info',
                        icon: 'info'
                    });
                });
        }
    };

    const handleRequestCall = () => {
        try {
            setLoading(true);
            showMessage({
                message: 'Request Sent',
                description: 'We will get back to you soon',
                type: 'success',
                icon: 'success'
            });
            setLoading(false);
            return navigation.navigate('HomeTab');
        } catch (error) {
            setLoading(false);
            return showMessage({
                message: 'Request Failed',
                description: 'Please try again',
                type: 'info',
                icon: 'info'
            });
        }
    };

    const onScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / width);
        setCurrentImageIndex(index);
    };




    return (
        <View style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                style={{ paddingBottom: 100 }}
            >
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                >


                    {data?.property_images?.map((image: string, index: number) => (

                        <ImageBackground
                            key={index}
                            source={{ uri: image }}
                            style={[styles.dataBackgroundImage, { width: width }]}
                        >
                            {/* positioned number */}
                            <View style={styles.imageIndicatorContainer}>
                                <Text style={styles.imageIndicatorText}>
                                    {currentImageIndex + 1}/{data?.property_images?.length}
                                </Text>
                            </View>
                            {/* positioned number */}

                            <View style={styles.ImageHeaderBarContainerWithBack}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        navigation.goBack();
                                    }}
                                >
                                    {/* <ArrowBack /> */}
                                    <ArrowBack
                                        size={20}
                                        color
                                        styles={{
                                            backgroundColor: COLORS.primaryBlackHex,
                                            padding: 5,
                                            borderRadius: 25,
                                            width: 30,
                                            height: 30,
                                            marginTop: -10,
                                            marginLeft: 10
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            {/* positioned like */}
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.heartIconContainer}
                                onPress={() => handleLike()}
                            >
                                <Entypo
                                    name="heart"
                                    size={25}
                                    color={liked ? COLORS.primaryDarkRedHex : COLORS.primaryWhiteHex}
                                />
                            </TouchableOpacity>
                            {/* positioned like */}

                            {/* positited arrow right */}
                            <TouchableOpacity
                                style={[styles.rightArrow]}
                                activeOpacity={1}
                                onPress={() => {
                                    const newIndex = currentImageIndex + 1;
                                    if (newIndex < data?.property_images?.length) {
                                        setCurrentImageIndex(newIndex);
                                    }
                                }}
                            >
                                <MaterialIcons
                                    name="arrow-forward-ios"
                                    size={30}
                                    color={COLORS.primaryBlackHex}
                                    onPress={() => {
                                        const newIndex = currentImageIndex + 1;
                                        if (newIndex < data?.property_images?.length) {
                                            setCurrentImageIndex(newIndex);
                                        }
                                    }}
                                />

                            </TouchableOpacity>
                            {/* positioned arrow right */}

                            {/* positioned arrow left */}
                            <TouchableOpacity
                                style={[styles.leftArrow]}
                                activeOpacity={1}
                                onPress={() => {
                                    const newIndex = currentImageIndex + 1;
                                    if (newIndex < data?.property_images?.length) {
                                        setCurrentImageIndex(newIndex);
                                    }
                                }}
                            >
                                <MaterialIcons
                                    name="arrow-back-ios"
                                    size={30}
                                    color={COLORS.primaryBlackHex}
                                    onPress={() => {
                                        const newIndex = currentImageIndex + 1;
                                        if (newIndex < data?.property_images?.length) {
                                            setCurrentImageIndex(newIndex);
                                        }
                                    }}
                                />

                            </TouchableOpacity>
                            {/* positioned arrow left */}
                        </ImageBackground>
                    ))}

                </ScrollView>



                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            generalStyles.loginContainer,
                            { marginTop: 5 }
                        ]}
                        onPress={() => openMapsForDirections()}
                    >
                        <Text style={generalStyles.loginText}>
                            {'Take me there'}
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={[
                            generalStyles.bottomHairline,
                            styles.hairLineStyles
                        ]}
                    />

                    <View
                        style={[
                            generalStyles.flexStyles,
                            {
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }
                        ]}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.CardTitle}>{data?.name}</Text>
                            <View style={[generalStyles.flexStyles]}>
                                <Entypo
                                    name="location-pin"
                                    size={15}
                                    color={'#ff5b6e'}
                                    style={{ marginLeft: -5 }}
                                />
                                <Text style={styles.CardSubtitle}>
                                    {data?.location}
                                </Text>
                            </View>
                            <View style={[generalStyles.flexStyles]}>
                                <Entypo
                                    name="location-pin"
                                    size={15}
                                    color={'#ff5b6e'}
                                    style={{ marginLeft: -5 }}
                                />
                                <Text
                                    style={[
                                        generalStyles.CardTitle,
                                        { fontSize: FONTSIZE.size_10 }
                                    ]}
                                >
                                    {calculateDistance(
                                        position?.latitude,
                                        position?.longitude,
                                        data.lat,
                                        data.long
                                    )}
                                    km(s) from you
                                </Text>
                            </View>
                            <View
                                style={[
                                    generalStyles.flexStyles,
                                    { paddingVertical: 5 }
                                ]}
                            >
                                <AntDesign
                                    name="star"
                                    size={12}
                                    color={'#FCB72B'}
                                    style={{ marginLeft: -5 }}
                                />
                                <Text style={styles.CardSubtitle}>
                                    {'4.6'}(103) reviews
                                </Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <QRCode value={data?.zippy_id} size={40} />
                            <View
                                style={[
                                    generalStyles.flexStyles,
                                    { paddingVertical: 5 }
                                ]}
                            >
                                <Text style={styles.CardSubtitle}>
                                    {data?.number_of_beds} bedroom(s)
                                </Text>
                                <Text style={styles.CardSubtitle}>
                                    {data?.number_of_baths} bathroom(s)
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={[
                            generalStyles.flexStyles,
                            {
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginVertical: 10
                            }
                        ]}
                    >
                        <View
                            style={[
                                generalStyles.flexStyles,
                                { alignItems: 'center' }
                            ]}
                        >
                            <Image
                                source={{
                                    uri:
                                        'https://plus.unsplash.com/premium_photo-1658506615399-d1280310ad6c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFmcmljYW4lMjBwcm9wZXJ0eSUyMGFnZW50fGVufDB8fDB8fHww'
                                }}
                                style={styles.imageStyles}
                            />
                            <View style={{ marginHorizontal: 5 }}>
                                <Text style={[styles.CardTitle, {}]}>
                                    {data.agent.name}
                                </Text>
                                <Text style={styles.CardSubtitle}>
                                    {'Property Agent'}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[
                                        generalStyles.loginContainer,
                                        { width: '100%', marginTop: 0 }
                                    ]}
                                    onPress={() => handleRequestCall()}
                                >
                                    <Text style={generalStyles.loginText}>
                                        {'Request Call'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* collapsable  services*/}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            generalStyles.flexStyles,
                            {
                                //justifyContent: 'space-between',
                                 paddingVertical: 5,
                                 alignItems: 'center',
                                // justifyContent: 'center'
                            }
                        ]}
                        onPress={() => {
                            setServicesCollapsed(!servicesCollapsed);
                        }}
                    >
                        <View style={{ flex: 0.4 }}>
                            <Text style={[generalStyles.CardTitle]}>{'Services'}</Text>
                        </View>

                        <AntDesign
                            name={servicesCollapsed ? 'downcircleo' : 'upcircleo'}
                            size={20}
                            color={COLORS.primaryOrangeHex}
                            style={{ marginLeft: 10 }}
                        />
                    </TouchableOpacity>

                    <Collapsible collapsed={servicesCollapsed}>
                        <View>
                            <Text style={generalStyles.CardSubtitle}>
                                {data?.services.length > 0 ? data?.services.map(
                                    (service: any, index: number) => {
                                        return (
                                            <Text
                                                style={styles.CardSubtitle}
                                                key={index}
                                            >
                                                {service?.name}
                                            </Text>
                                        );
                                    }
                                ) : 'No Services Available'}

                            </Text>
                        </View>
                    </Collapsible>
                    {/* collapsable services */}

                    {/* collapsable amenties */}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            generalStyles.flexStyles,
                            {
                                //justifyContent: 'center',
                                paddingVertical: 5,
                                alignItems: 'center'
                                
                            }
                        ]}
                        onPress={() => {
                            setAmenitiesCollapsed(!amenitiesCollapsed);
                        }}
                    >
                        <View style={{ flex: 0.4 }} >
                            <Text style={[generalStyles.CardTitle]}>{'Amenities'}</Text>
                        </View>

                        <AntDesign
                            name={amenitiesCollapsed ? 'downcircleo' : 'upcircleo'}
                            size={20}
                            color={COLORS.primaryOrangeHex}
                            style={{ marginLeft: 10 }}
                        />
                    </TouchableOpacity>

                    <Collapsible collapsed={amenitiesCollapsed}>
                        <View>
                            <Text style={[generalStyles.CardSubtitle]}>
                                {data.amenities.length > 0 ? data?.amenities?.map(
                                    (amentity: any, index: number) => {
                                        return (
                                            <Text
                                                style={styles.CardSubtitle}
                                                key={index}
                                            >
                                                {amentity?.name}
                                            </Text>
                                        );
                                    }
                                )
                                    : 'No Amenities Available'}
                            </Text>
                        </View>
                    </Collapsible>

                    {/* collapsable amenties */}

                    {/* collapsable public facilites */}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            generalStyles.flexStyles,
                            {
                                //justifyContent: 'space-between',
                                paddingVertical: 5,
                                alignItems: 'center',
                                //justifyContent: 'center'
                            }
                        ]}
                        onPress={() => {
                            setPublicCollapsed(!publicCollapsed);
                        }}
                    >
                        <View style={{ flex: 0.4 }}>
                            <Text style={[generalStyles.CardTitle]}>{'Public Facilities'}</Text>
                        </View>
                        <AntDesign
                            name={publicCollapsed ? 'downcircleo' : 'upcircleo'}
                            size={20}
                            color={COLORS.primaryOrangeHex}
                            style={{ marginLeft: 10 }}
                        />
                    </TouchableOpacity>

                    <Collapsible collapsed={publicCollapsed}>
                        <View>
                            <Text style={[generalStyles.CardSubtitle]}>
                                {data?.public_facilities?.length > 0 ? data?.public_facilities?.map(
                                    (facility: any, index: number) => {
                                        return (
                                            <Text
                                                style={styles.CardSubtitle}
                                                key={index}
                                            >
                                                {facility}
                                            </Text>
                                        );
                                    }
                                ) : 'No Public Facilities Available'}
                            </Text>
                        </View>
                    </Collapsible>
                    {/* collapsable public facilites */}

                    <View>
                        <Text style={styles.CardTitle}>About Property</Text>
                        <Text style={styles.CardSubtitle}>
                            {data?.description}
                        </Text>
                    </View>

                    {/* likes sections */}
                    <FourReviews
                     property_id={data?.id}
                    />
                    {/* likes section */}

                </View>
                {loading && (
                    <ActivityIndicator
                        style={{ marginTop: 20 }}
                        size="large"
                        color={COLORS.primaryWhiteHex}
                    />
                )}
            </ScrollView>
            <View style={styles.fixedBottomBar}>
                <Text style={styles.priceText}>
                    {data?.currency?.name} {formatCurrency(data?.price)}
                </Text>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[generalStyles.loginContainer, styles.bookNowButton]}
                    // onPress={() => handleBookNow()}
                    onPress={() => navigation.navigate('ConfirmAndPay', { property: data })}
                >
                    <Text style={generalStyles.loginText}>{'Book Now'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PropertyDetails;

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        padding: 10
    },
    hairLineStyles: {
        width: '80%',
        marginVertical: 10
    },
    textPadding: {
        padding: 5,
        fontSize: 18
    },
    CardTitle: {
        fontFamily: FONTFAMILY.roboto_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.roboto_regular,
        color: COLORS.primaryLightGreyHex,
        fontSize: FONTSIZE.size_10
    },
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 10 : 0
    },
    dataBackgroundImage: {
        aspectRatio: 25 / 15,
        justifyContent: 'space-between'
    },
    imageStyles: {
        width: 35,
        height: 35,
        borderRadius: 20
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
        borderTopColor: '#ccc'
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    bookNowButton: {
        width: '40%',
        marginTop: 0
    },
    imageIndicatorContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //backgroundColor: "red",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    imageIndicatorText: {
        color: 'white',
        fontSize: 14
    },
    heartIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: COLORS.primaryBlackHex,
        //backgroundColor: "red",
        borderRadius: 20,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    heartIcon: {
        width: 30,
        height: 30
    },
    leftArrow: {
        position: 'absolute',
        top: 100,
        left: 10,
        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //backgroundColor: "red",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    rightArrow: {
        position: 'absolute',
        top: 100,
        right: 10,
        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //backgroundColor: "red",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});
