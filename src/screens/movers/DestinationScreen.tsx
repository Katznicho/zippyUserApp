import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../utils/generatStyles';

const DestinationScreen = ({ navigation, route }: any) => {
    const { carType, pickupCoords, pickupDateTime, notes, pickupAddress, itemDescription } = route.params;
    const [destinationCoords, setDestinationCoords] = useState<any>(null);
    const [destinationAddress, setDestinationAddress] = useState<any>(null);



    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: pickupCoords.latitude,
                    longitude: pickupCoords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={(e) => {
                    setDestinationCoords(e.nativeEvent.coordinate);
                    setDestinationAddress(''); // Clear address when the user selects a point on the map
                }}
            >
                {pickupCoords && (
                    <Marker coordinate={pickupCoords} title="Pickup">
                        <Callout>
                            <View>
                                <Text>{pickupAddress?.address}</Text>
                            </View>
                        </Callout>
                    </Marker>
                )}

                {destinationCoords && (
                    <Marker coordinate={destinationCoords} title="Destination">
                        {destinationAddress && (
                            <Callout>
                                <View>
                                    <Text>{destinationAddress?.address}</Text>
                                </View>
                            </Callout>
                        )}
                    </Marker>
                )}

                {/* Draw polyline if both pickup and destination are available */}
                {pickupCoords && destinationCoords && (
                    <Polyline
                        coordinates={[pickupCoords, destinationCoords]} // Line between pickup and destination
                        strokeColor={COLORS.primaryOrangeHex} // Line color
                        strokeWidth={4} // Line thickness
                    />
                )}
            </MapView>

            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
                    placeholder="Search Destination"
                    onPress={(data, details = null) => {
            
                        setDestinationCoords({
                            latitude: details?.geometry.location.lat,
                            longitude: details?.geometry.location.lng,
                        });
                        setDestinationAddress({
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
                            marginTop: 20, // Spacing from top of the map
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
                style={styles.confirmButton}
                // style={  }
                onPress={() => {
                    if (destinationCoords && destinationAddress) {
                        navigation.navigate('MoverSummaryScreen', {
                            carType,
                            pickupCoords,
                            pickupAddress,
                            destinationCoords,
                            destinationAddress,
                            pickupDateTime,
                            notes,
                            itemDescription
                        });
                    } else {
                        alert('Please select a destination');
                    }
                }}
            >
                <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    searchContainer: {
        position: 'absolute',
        top: 20, // 
        left: 0,
        right: 0,
        zIndex: 1,
    },
    costText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
    confirmButton: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        padding: 15,
        // backgroundColor: '#28a745',
        backgroundColor: COLORS.primaryWhiteHex,
        borderRadius: 10,
        alignItems: 'center',

    },
    confirmButtonText: { color: '#fff', fontWeight: '600' },
});

export default DestinationScreen;
