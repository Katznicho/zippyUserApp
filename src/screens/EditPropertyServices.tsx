import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { generalStyles } from './utils/generatStyles'
import { KeyboardAwareScrollView, Checkbox } from 'react-native-ui-lib'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { GET_ALL_AMENTITIES, GET_ALL_SERVICES } from './utils/constants/routes'
import { RootState } from '../redux/store/dev'
import { useSelector } from 'react-redux'
import { COLORS, FONTFAMILY } from '../theme/theme'

const EditPropertyServices: React.FC<any> = () => {

    const { authToken } = useSelector((state: RootState) => state.user);

    const { item } = useRoute<any>().params

    const [errors, setErrors] = useState<any>({})

    const [services, setServices] = useState<any>([])
    const [amenities, setAmenities] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)

    const isFocused = useIsFocused();


    useEffect(() => {
        setLoading(true)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }

        fetch(GET_ALL_SERVICES, {
            method: 'GET',
            headers
        }).then((res) => res.json()).then((data) => {
            // console.log(data)
            setServices(data?.data)
        }).catch((err) => {

        })

        fetch(GET_ALL_AMENTITIES, {
            method: 'GET',
            headers
        }).then((res) => res.json()).then((data) => {
            // console.log(data)
            setAmenities(data?.data)
        })
    }, [isFocused])
    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                keyboardShouldPersistTaps="always"
            >
                {/* services */}
                {/* <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                            Select Property Services*</Text>
                    </View>
                    <View>
                        {
                            services.map((item: any) => {
                                return (
                                    <Checkbox
                                        key={item.id}
                                        label={item.name}
                                        value={property.services?.includes(item.id)}
                                        color={COLORS.primaryOrangeHex}
                                        containerStyle={styles.viewStyles}
                                        onValueChange={(isChecked: boolean) => {
                                            // Check if the service ID is already in the array
                                            const isServiceInArray = property.services?.includes(item.id);

                                            // Create a new array based on the checkbox state
                                            let updatedServices: any[];

                                            if (isChecked && !isServiceInArray) {
                                                // Add the service ID to the array if the checkbox is checked and the ID is not present
                                                updatedServices = [...(property.services || []), item.id];
                                            } else if (!isChecked && isServiceInArray) {
                                                // Remove the service ID from the array if the checkbox is unchecked and the ID is present
                                                updatedServices = (property.services || []).filter((id: string) => id !== item.id);
                                            } else {
                                                // No change needed if the checkbox state and array state are consistent
                                                updatedServices = property.services;
                                            }

                                            // Update the state
                                            setProperty((prev: any) => {
                                                return { ...prev, services: updatedServices };
                                            });
                                        }}
                                    />
                                );
                            })

                        }
                    </View>

                    <View>
                        {errors.services && <Text style={generalStyles.errorText}>{errors.services}</Text>}
                    </View>

                </View> */}
                {/* services */}

                {/* amentities */}
                {/* <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                            Select Property Amenties*</Text>
                    </View>
                    <View>
                        {
                            amenities.map((item: any) => {
                                return (
                                    <Checkbox
                                        key={item.id}
                                        label={item.name}
                                        value={property.amenities?.includes(item.id)}
                                        color={COLORS.primaryOrangeHex}
                                        containerStyle={styles.viewStyles}
                                        onValueChange={(isChecked: boolean) => {
                                            // Check if the amenity ID is already in the array
                                            const isAmenityInArray = property.amenities?.includes(item.id);

                                            // Create a new array based on the checkbox state
                                            let updatedAmenities: any[];

                                            if (isChecked && !isAmenityInArray) {
                                                // Add the amenity ID to the array if the checkbox is checked and the ID is not present
                                                updatedAmenities = [...(property.amenities || []), item.id];
                                            } else if (!isChecked && isAmenityInArray) {
                                                // Remove the amenity ID from the array if the checkbox is unchecked and the ID is present
                                                updatedAmenities = (property.amenities || []).filter((id: string) => id !== item.id);
                                            } else {
                                                // No change needed if the checkbox state and array state are consistent
                                                updatedAmenities = property.amenities;
                                            }

                                            // Update the state
                                            setProperty((prev: any) => {
                                                return { ...prev, amenities: updatedAmenities };
                                            });
                                        }}
                                    />
                                );
                            })


                        }
                    </View>

                    <View>
                        {errors.amenities && <Text style={generalStyles.errorText}>{errors.amenities}</Text>}
                    </View>

                </View> */}
                {/* amentities */}


            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default EditPropertyServices

const styles = StyleSheet.create({
    viewStyles: {
        marginHorizontal: 10, marginVertical: 5
    },

    formContainer: {
        marginVertical: 10,
        marginHorizontal: 15
    },

    buttonStyles: {
        width: "80%",
        marginTop: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    },
    extraMargingRight: {
        marginRight: 30
    },
    fieldStyles: {
        borderBottomColor: COLORS.primaryWhiteHex,
        borderBottomWidth: 2,
        // height: 45
        fontSize: 15,
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex
    },
    labelStyles: {
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 15
    },
    iconStyles: {
        position: 'absolute',
        right: 10
    },

})