import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Entypo from 'react-native-vector-icons/Entypo';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS, FONTFAMILY } from '../theme/theme';

navigator.geolocation = require("@react-native-community/geolocation")

const AddLocation = ({ property, setProperty }: any) => {


    return (
        <View>
            <View style={generalStyles.viewStyles}>
                <Text style={[{ fontSize: 20, fontFamily: FONTFAMILY.ro }, generalStyles.textStyle]}>
                    WHERE COULD YOU LIKE TO STAY ?
                </Text>
            </View>

            {/* location */}
            <GooglePlacesAutocomplete
                nearbyPlacesAPI="GooglePlacesSearch"
                placeholder={"enter desired location"}
                currentLocation={true}
                enableHighAccuracyLocation={true}
                autoFillOnNotFound={true}
                textInputProps={{
                    placeholderTextColor: COLORS.primaryWhiteHex
                }}
                renderRow={(data) => <View style={[generalStyles.flexStyles, { alignItems: 'center' }]}>
                    <Entypo name="location-pin" color={COLORS.primaryOrangeHex} size={20} />
                    <Text style={{ color: COLORS.primaryWhiteHex }}>{data.description}</Text>
                </View>}

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
                        width: "100%",
                        backgroundColor: COLORS.primaryBlackHex,
                        marginHorizontal: 5,
                        marginVertical: 10
                    },
                    textInputContainer: {
                        backgroundColor: COLORS.primaryBlackHex,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        marginHorizontal: 20,
                        borderRadius: 20,
                    },
                    textInput: {
                        color: COLORS.primaryWhiteHex,
                        backgroundColor: COLORS.primaryBlackHex,
                        fontSize: 16,
                        borderWidth: 0.5,
                        borderColor: COLORS.primaryWhiteHex,
                        width: "100%",
                    },
                    predefinedPlacesDescription: {
                        color: COLORS.primaryOrangeHex,
                    },
                    listView: {
                        backgroundColor: COLORS.primaryBlackHex,
                        borderRadius: 10,
                        // marginHorizontal: 10,
                        marginTop: 10,
                        // elevation: 5,
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
                    // setProperty({
                    //     ...property,
                    //     location: details?.formatted_address,
                    //     lat: details?.geometry.location.lat,
                    //     long: details?.geometry.location.lng,
                    //     address: details?.formatted_address,
                    //     longitude: details?.geometry.location.lng,
                    //     latitude: details?.geometry.location.lat
                    // })
                    console.log("==========================")
                    console.log(details, data)
                    console.log("========================")


                }}
                query={{
                    key: 'AIzaSyATT-OoxvppDdCRfNypfjLY5VWbZEqs_GA',
                    language: 'en',
                    components: 'country:ug'
                }}
                GooglePlacesDetailsQuery={{
                    fields: ['formatted_address', 'geometry'],
                    language: 'en',
                    components: 'country:ug',


                }}
            />
            {/* location */}
        </View>
    )
}

export default AddLocation

const styles = StyleSheet.create({})