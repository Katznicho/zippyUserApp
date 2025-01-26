import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { COLORS } from '../../theme/theme';
import useGetUserLocation from '../../hooks/useGetUserLocation';
import { pick } from 'react-native-document-picker';

const PickupScreen = ({ navigation, route }) => {
    const { carType, pickup,  notes, pickupDateTime, itemDescription } = route.params;
    const [pickupCoords, setPickupCoords] = useState<any>(null);
    const [address, setAddress] = useState<any>(null);

    const { position } = useGetUserLocation();

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: position?.latitude ?? 0.3476,
                    longitude: position?.longitude ?? 32.5825,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={(e) => setPickupCoords(e.nativeEvent.coordinate)}
            >
                {pickupCoords && (
                    <Marker
                        coordinate={pickupCoords}
                        image={require('../../assets/app_images/marker.png')} // Use your custom marker image
                    >
                        {/* Callout shows the address the user selected */}
                        {address && (
                            <Callout>
                                <View>
                                    <Text>{address.address}</Text>
                                </View>
                            </Callout>
                        )}
                    </Marker>
                )}
            </MapView>
            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
                    placeholder="Search Pickup Location"
                    onPress={(data, details = null) => {
                        setPickupCoords({
                            latitude: details?.geometry.location.lat,
                            longitude: details?.geometry.location.lng,
                        });
                        setAddress({
                            address: details?.formatted_address,
                            longitude: details?.geometry.location.lng,
                            latitude: details?.geometry.location.lat,
                        });
                    }}
                    query={{
                        key: 'AIzaSyATT-OoxvppDdCRfNypfjLY5VWbZEqs_GA',
                        language: 'en',
                        components: 'country:ug',
                    }}
                    fetchDetails={true}
                    debounce={400}
                    enablePoweredByContainer={false}
                    styles={{
                        container: { flex: 1 },
                        textInputContainer: {
                            backgroundColor: COLORS.primaryBlackHex,
                            borderRadius: 20,
                            marginHorizontal: 20,
                        },
                        textInput: {
                            color: COLORS.primaryWhiteHex,
                            backgroundColor: COLORS.primaryBlackHex,
                            fontSize: 16,
                            borderWidth: 0.5,
                            borderColor: COLORS.primaryWhiteHex,
                        },
                        listView: {
                            backgroundColor: COLORS.primaryBlackHex,
                            borderRadius: 10,
                            marginHorizontal: 10,
                            marginTop: 10,
                        },
                    }}
                />
            </View>
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('DestinationScreen', { carType, pickupCoords, pickupDateTime, notes, pickupAddress: address, itemDescription })}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    searchContainer: {
        position: 'absolute',
        top: 10,
        width: '100%',
    },
    nextButton: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        padding: 15,
        backgroundColor: COLORS.primaryWhiteHex,
        borderRadius: 10,
        alignItems: 'center',
    },
    nextButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
    marker: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: COLORS.primaryWhiteHex,
    },
    markerText: {
        fontSize: 24,
        color: COLORS.primaryWhiteHex,
    },
});

export default PickupScreen;
