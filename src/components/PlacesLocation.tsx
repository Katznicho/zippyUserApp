import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import { COLORS } from '../theme/theme';

const PlacesLocation = () => {
    return (

        <GooglePlacesAutocomplete
            nearbyPlacesAPI="GooglePlacesSearch"
            placeholder='Enter your location'
            currentLocation={true}
            enableHighAccuracyLocation={true}
            autoFillOnNotFound={true}

            fetchDetails={true}
            debounce={400}
            onFail={(error) => {
                console.log("================Error==================");
                console.log(JSON.stringify(error))
                console.log("================Error==================");
            }}
            enablePoweredByContainer={false}

            minLength={2}

            styles={{
                container: {
                    flex: 1,
                    width: "90%",
                    backgroundColor: COLORS.primaryBlackHex,
                },
                textInputContainer: {
                    backgroundColor: COLORS.primaryBlackHex,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    marginHorizontal: 20,
                    borderRadius: 20,
                },
                textInput: {
                    color: COLORS.primaryOrangeHex,
                    backgroundColor: COLORS.primaryBlackHex,
                    fontSize: 16,
                    borderWidth: 1,
                    borderColor: COLORS.primaryOrangeHex,
                    width: "100%",
                },
                predefinedPlacesDescription: {
                    color: '#1faadb',
                },
                listView: {
                    backgroundColor: COLORS.primaryBlackHex,
                    borderRadius: 10,
                    marginHorizontal: 10,
                    marginTop: 10,
                    elevation: 5,
                    zIndex: 5,
                },
                row: {
                    backgroundColor: COLORS.primaryBlackHex,
                    padding: 13,
                    height: 50,
                    flexDirection: 'row',
                },
                separator: {
                    height: 0.5,
                    backgroundColor: COLORS.primaryOrangeHex,
                },
                description: {
                    color: COLORS.primaryOrangeHex,
                },
                poweredContainer: {
                    backgroundColor: COLORS.primaryBlackHex,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: COLORS.primaryOrangeHex,
                    borderTopWidth: 0.5,
                },
                powered: {
                    color: COLORS.primaryOrangeHex,
                },
            }}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log("==================================");
                console.log(data, details);
                console.log("==================================");
            }}
            query={{
                key: 'AIzaSyATT-OoxvppDdCRfNypfjLY5VWbZEqs_GA',
                language: 'en',
                components: 'country:ug'
            }}
            GooglePlacesDetailsQuery={{
                fields: 'formatted_address',
                language: 'en',
                components: 'country:ug'
            }}
        />



    );
}

export default PlacesLocation

const styles = StyleSheet.create({
    genderStyles: {
        width: 110,
        height: 110,
        padding: 10,
        borderRadius: 100,
        marginVertical: 15,
    },
    genderNameStyles: {
        marginTop: 0,
    }
});