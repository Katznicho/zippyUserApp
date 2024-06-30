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
                            setLiked(!liked);
                            return showMessage({
                                message: 'Liked Successfully',
                                type: 'success',
                                icon: 'success',
                                duration: 3000,
                                autoHide: true,
                                position: 'bottom'
                            });
                        }
                    }
                ],
                { cancelable: false }
            );
        } else {
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
                            setLiked(!liked);
                            return showMessage({
                                message: 'Disliked Successfully',
                                type: 'success',
                                icon: 'success',
                                duration: 3000,
                                autoHide: true,
                                position: 'bottom'
                            });
                        }
                    }
                ],
                { cancelable: false }
            );
        }
    };

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
                            {/* Positioned number */}
                            <View style={styles.imageIndicatorContainer}>
                                <Text style={styles.imageIndicatorText}>
                                    {currentImageIndex + 1}/{data?.property_images?.length}
                                </Text>
                            </View>
                            {/* Positioned number */}

                            <View style={styles.ImageHeaderBarContainerWithBack}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        navigation.goBack();
                                    }}
                                >
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
                            {/* Positioned like */}
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
                            {/* Positioned like */}
                        </ImageBackground>
                    ))}
                    {/* Left arrow */}
                    {currentImageIndex > 0 && (
                        <TouchableOpacity
                            style={styles.arrowLeftContainer}
                            onPress={() => {
                                const newIndex = currentImageIndex - 1;
                                if (newIndex >= 0) {
                                    setCurrentImageIndex(newIndex);
                                    scrollViewRef.current.scrollTo({ x: newIndex * width, animated: true });
                                }
                            }}
                        >
                            <AntDesign name="leftcircle" size={30} color={COLORS.primaryWhiteHex} />
                        </TouchableOpacity>
                    )}
                    {/* Right arrow */}
                    {currentImageIndex < data?.property_images?.length - 1 && (
                        <TouchableOpacity
                            style={styles.arrowRightContainer}
                            onPress={() => {
                                const newIndex = currentImageIndex + 1;
                                if (newIndex < data?.property_images?.length) {
                                    setCurrentImageIndex(newIndex);
                                    scrollViewRef.current.scrollTo({ x: newIndex * width, animated: true });
                                }
                            }}
                        >
                            <AntDesign name="rightcircle" size={30} color={COLORS.primaryWhiteHex} />
                        </TouchableOpacity>
                    )}
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
                        <Text
                            style={[
                                generalStyles.fontBold,
                                { color: COLORS.primaryWhiteHex }
                            ]}
                        >
                            Get Directions
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.row}>
                        <Text style={[generalStyles.fontBold, styles.txt]}>
                            {data?.name}
                        </Text>
                        <Text style={[generalStyles.fontBold, styles.price]}>
                            {formatCurrency(data?.price)}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={{ flex: 0.6 }}>
                            <Text
                                style={[generalStyles.fontRegular, styles.description]}
                            >
                                {data?.description}
                            </Text>
                            <Text style={[generalStyles.fontRegular, styles.txt]}>
                                {data?.address}
                            </Text>
                        </View>
                        <QRCode
                            value={data?.id.toString()}
                            size={80}
                            color={COLORS.primaryBlackHex}
                            backgroundColor="white"
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={[generalStyles.fontBold, styles.distance]}>
                            {calculateDistance(
                                position.latitude,
                                position.longitude,
                                data?.lat,
                                data?.long
                            )} KM away
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[styles.requestBtn, { marginRight: 20 }]}
                            onPress={handleRequestCall}
                        >
                            <Text
                                style={[
                                    generalStyles.fontBold,
                                    { color: COLORS.primaryWhiteHex }
                                ]}
                            >
                                Request Call
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.bookNowBtn}
                            onPress={handleBookNow}
                        >
                            <Text
                                style={[
                                    generalStyles.fontBold,
                                    { color: COLORS.primaryWhiteHex }
                                ]}
                            >
                                Book Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.collapsibleContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setServicesCollapsed(!servicesCollapsed)}
                        style={styles.collapsibleHeader}
                    >
                        <Text style={styles.collapsibleHeaderText}>Services</Text>
                        <Ionicons
                            name={servicesCollapsed ? 'chevron-down' : 'chevron-up'}
                            size={20}
                            color={COLORS.primaryBlackHex}
                        />
                    </TouchableOpacity>
                    <Collapsible collapsed={servicesCollapsed}>
                        <View style={styles.collapsibleContent}>
                            {data?.services?.map((service: string, index: number) => (
                                <Text key={index} style={styles.collapsibleText}>
                                    {service}
                                </Text>
                            ))}
                        </View>
                    </Collapsible>
                </View>

                <View style={styles.collapsibleContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setAmenitiesCollapsed(!amenitiesCollapsed)}
                        style={styles.collapsibleHeader}
                    >
                        <Text style={styles.collapsibleHeaderText}>Amenities</Text>
                        <Ionicons
                            name={amenitiesCollapsed ? 'chevron-down' : 'chevron-up'}
                            size={20}
                            color={COLORS.primaryBlackHex}
                        />
                    </TouchableOpacity>
                    <Collapsible collapsed={amenitiesCollapsed}>
                        <View style={styles.collapsibleContent}>
                            {data?.amenities?.map((amenity: string, index: number) => (
                                <Text key={index} style={styles.collapsibleText}>
                                    {amenity}
                                </Text>
                            ))}
                        </View>
                    </Collapsible>
                </View>

                <View style={styles.collapsibleContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setPublicCollapsed(!publicCollapsed)}
                        style={styles.collapsibleHeader}
                    >
                        <Text style={styles.collapsibleHeaderText}>
                            Public Transport
                        </Text>
                        <Ionicons
                            name={publicCollapsed ? 'chevron-down' : 'chevron-up'}
                            size={20}
                            color={COLORS.primaryBlackHex}
                        />
                    </TouchableOpacity>
                    <Collapsible collapsed={publicCollapsed}>
                        <View style={styles.collapsibleContent}>
                            {data?.public_transport?.map(
                                (transport: string, index: number) => (
                                    <Text key={index} style={styles.collapsibleText}>
                                        {transport}
                                    </Text>
                                )
                            )}
                        </View>
                    </Collapsible>
                </View>
            </ScrollView>
            {loading && <ActivityIndicator />}
        </View>
    );
};

export default PropertyDetails;

const styles = StyleSheet.create({
    collapsibleContainer: {
        marginVertical: SPACING.small
    },
    collapsibleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.small,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primaryGreyHex
    },
    collapsibleHeaderText: {
        fontFamily: FONTFAMILY.bold,
        fontSize: FONTSIZE.medium,
        color: COLORS.primaryBlackHex
    },
    collapsibleContent: {
        paddingVertical: SPACING.small
    },
    collapsibleText: {
        fontFamily: FONTFAMILY.regular,
        fontSize: FONTSIZE.small,
        color: COLORS.primaryBlackHex,
        paddingVertical: SPACING.small
    },
    imageIndicatorContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 5,
        padding: 5
    },
    imageIndicatorText: {
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.bold
    },
    dataBackgroundImage: {
        height: height * 0.4,
        resizeMode: 'cover',
        justifyContent: 'space-between'
    },
    ImageHeaderBarContainerWithBack: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        top: SPACING.small,
        left: SPACING.small
    },
    heartIconContainer: {
        position: 'absolute',
        top: SPACING.small,
        right: SPACING.small,
        backgroundColor: COLORS.primaryBlackHex,
        padding: SPACING.small,
        borderRadius: 50
    },
    cardContainer: {
        padding: SPACING.large,
        backgroundColor: COLORS.primaryWhiteHex,
        borderRadius: SPACING.small,
        marginVertical: SPACING.small,
        elevation: 2,
        shadowColor: COLORS.primaryBlackHex,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: SPACING.small
    },
    txt: {
        fontSize: FONTSIZE.medium,
        color: COLORS.primaryBlackHex
    },
    price: {
        fontSize: FONTSIZE.large,
        color: COLORS.primaryBlackHex
    },
    description: {
        fontSize: FONTSIZE.small,
        color: COLORS.primaryGreyHex
    },
    distance: {
        fontSize: FONTSIZE.small,
        color: COLORS.primaryBlackHex
    },
    requestBtn: {
        flex: 1,
        backgroundColor: COLORS.primaryBlueHex,
        padding: SPACING.small,
        borderRadius: SPACING.small,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bookNowBtn: {
        flex: 1,
        backgroundColor: COLORS.primaryRedHex,
        padding: SPACING.small,
        borderRadius: SPACING.small,
        alignItems: 'center',
        justifyContent: 'center'
    },
    arrowLeftContainer: {
        position: 'absolute',
        left: 10,
        top: '50%',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15,
        padding: 5
    },
    arrowRightContainer: {
        position: 'absolute',
        right: 10,
        top: '50%',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15,
        padding: 5
    }
});
