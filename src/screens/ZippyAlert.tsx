import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { generalStyles } from './utils/generatStyles'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store/dev';
import PhoneInput from "react-native-phone-number-input";
import { COLORS, FONTFAMILY } from '../theme/theme'
import { CREATE_ZIPPY_ALERT, GET_ALL_AMENTITIES, GET_ALL_CATEGORIES, GET_ALL_SERVICES } from './utils/constants/routes'
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-ui-lib';
import UserLocation from '../components/Modals/UserLocation';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ActivityIndicator } from '../components/ActivityIndicator';
import { BOTTOM_NOTCH } from './utils/constants/constants';
// import { ScrollView } from 'react-native-virtualized-view';

const ZippyAlert = () => {

    const { user, authToken } = useSelector((state: RootState) => state.user);
    const tabBarHeight = useBottomTabBarHeight() + BOTTOM_NOTCH * 2;

    const navigation = useNavigation<any>()

    const [fullName, setFullName] = React.useState<any>(`${user?.fname} ${user?.lname}`);
    const [email, setEmail] = React.useState<any>(user?.email);
    const [errors, setErrors] = useState<any>({})

    const [loading, setLoading] = useState<boolean>()

    //phone number details
    const [phoneNumber, setPhoneNumber] = React.useState<any>(user?.phone.slice(4));
    const phoneInput = useRef<PhoneInput>(null);
    //phone number details

    const [selectedContactOptions, setSelectedContactOptions] = useState<any>([]);

    const [contactOptions, setContactOptions] = useState([
        {
            id: 0,
            name: "Any"
        },
        {
            id: 1,
            name: "SMS"
        },
        {
            id: 2,
            name: "Whatsapp"
        }, {
            id: 3,
            name: "Email"
        }, {
            id: 4,
            name: "PhoneCall"
        },

    ])

    const [openPicker, setOpenPicker] = useState<boolean>(false);

    const toggleOption = (optionName: string) => {
        if (optionName === "Any") {
            // If "Any" is selected, push all options to selectedContactOptions
            if (selectedContactOptions.includes("Any")) {
                // If "Any" is already selected, remove all options
                setSelectedContactOptions([]);
            } else {
                const allOptionsExceptAny = contactOptions
                    .filter(option => option.name !== "Any")
                    .map(option => option.name);
                setSelectedContactOptions(allOptionsExceptAny);
            }
        } else {
            // If any other option is selected, toggle its selection
            setSelectedContactOptions((prevSelectedOptions: string[]) => {
                if (prevSelectedOptions.includes(optionName)) {
                    // If already selected, remove it
                    return prevSelectedOptions.filter((option: any) => option !== optionName);
                } else {
                    // If not selected, add it
                    return [...prevSelectedOptions, optionName];
                }
            });
        }
    };

    const [categories, setCategories] = useState<any>([]);
    const [services, setServices] = useState<any>([]);
    const [amenities, setAmenities] = useState<any>([]);



    const [zippyAlert, setZippyAlert] = useState<any>({
        name: fullName,
        email: email,
        phone: `${user.phone}`,
        contactOptions: selectedContactOptions,
        amentities: [],
        services: [],
        propertyType: "",
        propertyTypeID: "",
        minimumPrice: "",
        maximumPrice: "",
        cost: "",
        latitude: "",
        longitude: "",
        address: "",
        selectedBedRoom: "",
        selectedBathRooms: ""
    })



    const onClear = () => {
        setZippyAlert({
            name: fullName,
            email: email,
            phone: `${user.phone}`,
            contactOptions: selectedContactOptions,
            amentities: [],
            services: [],
            propertyType: "",
            propertyTypeID: "",
            minimumPrice: "",
            maximumPrice: "",
            selectedBedRoom: "",
            selectedBathRooms: ""
        })
    }



    useEffect(() => {

        setLoading(true)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }

        fetch(GET_ALL_CATEGORIES, {
            method: 'GET',
            headers
        }).then((res) => res.json()).then((data) => {

            setCategories(data?.data)
        }).catch((err) => {
        })

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

        setLoading(false)

    }, [])


    const [bedRooms, setBedRooms] = useState([
        {
            id: 1,
            name: "Any"

        },
        {
            id: 2,
            name: "1"
        }, {
            id: 3,
            name: "2"
        },
        {
            id: 4,
            name: "3"
        }, {
            id: 5,
            name: "4"
        }, {
            id: 6,
            name: "5+"
        }
    ])

    const [bathRooms, setBathRooms] = useState([
        {
            id: 1,
            name: "Any"
        }, {
            id: 2,
            name: "1"
        }, {
            id: 3,
            name: "2"
        }, {
            id: 4,
            name: "3"
        }, {
            id: 5,
            name: "4"
        }, {
            id: 6,
            name: "5+"
        }
    ])

    const onCreateZippyAlert = () => {

        try {
            if (
                zippyAlert.name === "" ||
                zippyAlert.email === "" ||
                zippyAlert.phone === ""


            ) {

                return showMessage({
                    message: "All fields are required",
                    type: "danger",
                    autoHide: true,
                    duration: 3000,
                })
            }
            else {
                setLoading(true)
                const myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${authToken}`);

                const formData = new FormData();
                formData.append("name", zippyAlert.name);
                formData.append("email", zippyAlert.email);
                formData.append("phone", zippyAlert.phone);
                formData.append("property_type", zippyAlert.propertyType);
                formData.append("category_id", zippyAlert.propertyTypeID);
                formData.append("minimum_price", zippyAlert.minimumPrice);
                formData.append("maximum_price", zippyAlert.maximumPrice);
                formData.append("address", zippyAlert.address);
                formData.append("latitude", zippyAlert.latitude);
                formData.append("longitude", zippyAlert.longitude);
                formData.append("cost", zippyAlert.cost);

                //services loop through and also append them as an array
                zippyAlert?.services?.forEach((service: any) => {
                    formData.append("services[]", service)
                })

                //amenities loop through and also append them as an array
                zippyAlert?.amentities?.forEach((amenity: any) => {
                    formData.append("amenities[]", amenity)
                })

                //contact options loop through and also append them as an array
                // Loop through and append contact options as an array
                selectedContactOptions?.forEach((option: any) => {
                    formData.append("contact_options[]", option)
                })
                formData.append("number_of_bedrooms", zippyAlert.selectedBedRoom);
                formData.append("number_of_bathrooms", zippyAlert.selectedBathRooms);



                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: formData,
                };

                console.log(CREATE_ZIPPY_ALERT)

                fetch(CREATE_ZIPPY_ALERT, requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log("======res===============")
                        console.log(result)
                        console.log("=====================")
                        setLoading(false)
                        if (result?.response === "success") {
                            showMessage({
                                message: "Alert created successfully",
                                description: "Alert created successfully",
                                type: "success",
                                autoHide: true,
                                duration: 3000,
                            })
                            return navigation.navigate("ZippyAlertStack")
                        }
                        if (result?.alert_max == true) {
                            showMessage({
                                message: "Maximum number of alerts reached",
                                description: "Maximum number of alerts reached",
                                type: "info",
                                autoHide: true,
                                duration: 3000,
                            })
                            return navigation.navigate("ZippyAlertStack")
                        }
                        if (result?.response === "failure") {
                            return showMessage({
                                message: "Failed to create alert",
                                description: result.message,
                                type: "info",
                                autoHide: true,
                                duration: 3000,
                            })

                        }

                    })
                    .catch((error) => {
                        setLoading(false)
                        return showMessage({
                            message: "Something went wrong",
                            description: "Something went wrong",
                            type: "danger",
                            autoHide: true,
                            duration: 3000,
                        })
                    });


            }

        } catch (error) {
            console.log(error)
            return showMessage({
                message: "Something went wrong",
                type: "danger",
                autoHide: true,
                duration: 3000,
            })
        }
    }





    return (<ScrollView
        contentContainerStyle={{
            margin: 20,
            paddingBottom: 100

        }}
        style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
        keyboardShouldPersistTaps="always"
    >
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>
                Zippy Alert
            </Text>
        </View>
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <Text style={[generalStyles.textStyle]}>
                Create a zippy alert to get notified when property is available and matches your search
            </Text>
        </View>
        {/* chose how you want to be contacted */}
        {/* alert area */}
        {/* property categories */}
        <View>
            <View>
                <Text style={generalStyles.CardTitle}>Property Type</Text>
            </View>
            <View>
                <Text style={generalStyles.CardSubtitle}>
                    Select your desired property type
                </Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {
                    categories?.map((propertyType: any) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            key={propertyType.id}
                            style={[styles.touchableStyles, {
                                backgroundColor: zippyAlert?.propertyTypeID === propertyType.id ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                            }]}
                            onPress={() => setZippyAlert({ ...zippyAlert, propertyType: propertyType.name, propertyTypeID: propertyType.id })}
                        >
                            <Text style={[generalStyles.CardTitle, { color: COLORS.primaryBlackHex }]}>{propertyType.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
        {/* property categories */}


        <View style={[styles.hairLineStyles]} />

        {/* price range */}

        <View >

            {/* price ranges */}
            <View>

                <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                            Estimated Cost *</Text>

                    </View>
                    <View>
                        <TextInput
                            style={[generalStyles.formInput, styles.borderStyles]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            keyboardType="number-pad"
                            placeholder={'enter estimated price'}
                            onChangeText={(text) => setZippyAlert({ ...zippyAlert, minimumPrice: text, cost: text })}
                            value={zippyAlert?.minimumPrice}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"

                        />
                    </View>



                </View>


            </View>
            {/* price ranges */}
        </View>
        {/* price range */}
        <View style={[styles.hairLineStyles]} />


        {/* bedrooms */}
        <View>
            <View>
                <Text style={generalStyles.CardTitle}>BedRooms and Bathrooms</Text>
            </View>
            <View>
                <Text style={generalStyles.CardSubtitle}>
                    Select your desired bedrooms
                </Text>
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal
            >
                {
                    bedRooms?.map((room: any) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            key={room.id}
                            style={[styles.circleStyles, {
                                backgroundColor: zippyAlert?.selectedBedRoom === room.name ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                            }]}
                            onPress={() => setZippyAlert({ ...zippyAlert, selectedBedRoom: room.name })}
                        >
                            <Text style={[generalStyles.CardTitle, { color: COLORS.primaryBlackHex }]}>{room.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <View>
                <Text style={generalStyles.CardSubtitle}>
                    Select your desired bathrooms
                </Text>
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal
            >
                {
                    bathRooms?.map((room: any) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            key={room.id}
                            style={[styles.circleStyles, {
                                backgroundColor: zippyAlert?.selectedBathRooms === room.name ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                            }]}
                            onPress={() => setZippyAlert({ ...zippyAlert, selectedBathRooms: room.name })}
                        >
                            <Text style={[generalStyles.CardTitle, { color: COLORS.primaryBlackHex }]}>{room.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
        {/* bedroooms */}
        <View style={[styles.hairLineStyles]} />

        {/* property amentities */}
        <View>
            <View>
                <Text style={generalStyles.CardTitle}>Property Amentities</Text>
            </View>
            <View>
                <Text style={generalStyles.CardSubtitle}>
                    Select your desired property amentities
                </Text>
            </View>
            <View>
                {
                    amenities?.map((item: any) => {
                        return (
                            <View
                                key={item.id}
                                style={{ marginVertical: 5 }}
                            >
                                <Checkbox

                                    label={item.name}
                                    value={zippyAlert.amentities?.includes(item.id)}
                                    color={COLORS.primaryOrangeHex}
                                    onValueChange={(isChecked: boolean) => {
                                        // Check if the amenity ID is already in the array
                                        const isAmenityInArray = zippyAlert?.amentities?.includes(item.id);

                                        // Create a new array based on the checkbox state
                                        let updatedAmenities: any[];

                                        if (isChecked && !isAmenityInArray) {
                                            // Add the amenity ID to the array if the checkbox is checked and the ID is not present
                                            updatedAmenities = [...(zippyAlert?.amentities || []), item.id];
                                        } else if (!isChecked && isAmenityInArray) {
                                            // Remove the amenity ID from the array if the checkbox is unchecked and the ID is present
                                            updatedAmenities = (zippyAlert?.amenities || []).filter((id: string) => id !== item.id);
                                        } else {
                                            // No change needed if the checkbox state and array state are consistent
                                            updatedAmenities = zippyAlert?.amentities;
                                        }

                                        // Update the state
                                        setZippyAlert((prev: any) => {
                                            return { ...prev, amentities: updatedAmenities };
                                        });
                                    }}
                                />
                            </View>
                        );
                    })


                }
            </View>
        </View>
        {/* property amentities */}
        <View style={[styles.hairLineStyles]} />

        {/* property services */}
        <View>
            <View>
                <Text style={generalStyles.CardTitle}>Property Services</Text>
            </View>
            <View>
                <Text style={generalStyles.CardSubtitle}>
                    Select your desired property services
                </Text>
            </View>
            <View>
                {
                    services?.map((item: any) => {
                        return (
                            <View
                                key={item.id}
                                style={{ marginVertical: 5 }}
                            >
                                <Checkbox

                                    label={item.name}
                                    value={zippyAlert.services?.includes(item.id)}
                                    color={COLORS.primaryOrangeHex}
                                    onValueChange={(isChecked: boolean) => {
                                        // Check if the service ID is already in the array
                                        const isServiceInArray = zippyAlert.services?.includes(item.id);

                                        // Create a new array based on the checkbox state
                                        let updatedServices: any[];

                                        if (isChecked && !isServiceInArray) {
                                            // Add the service ID to the array if the checkbox is checked and the ID is not present
                                            updatedServices = [...(zippyAlert.services || []), item.id];
                                        } else if (!isChecked && isServiceInArray) {
                                            // Remove the service ID from the array if the checkbox is unchecked and the ID is present
                                            updatedServices = (zippyAlert.services || []).filter((id: string) => id !== item.id);
                                        } else {
                                            // No change needed if the checkbox state and array state are consistent
                                            updatedServices = zippyAlert.services;
                                        }

                                        // Update the state
                                        setZippyAlert((prev: any) => {
                                            return { ...prev, services: updatedServices };
                                        });
                                    }}
                                />
                            </View>
                        );
                    })

                }
            </View>
        </View>
        {/* property services */}

        <View style={[styles.hairLineStyles]} />

        {/* alert area */}

        {/* location details */}
        <View>
            <View>
                <Text style={generalStyles.CardTitle}>Location Details</Text>
            </View>
            <View>
                <Text style={generalStyles.CardSubtitle}>
                    Enter your desired location
                </Text>
            </View>
            <View>
                <TextInput
                    style={[generalStyles.formInput, styles.borderStyles]}
                    placeholderTextColor={COLORS.primaryWhiteHex}
                    // placeholderStyle={{ borderColor: 'red' }}
                    keyboardType="default"
                    placeholder={'enter current property  location'}
                    onChangeText={text => setOpenPicker(true)}
                    value={zippyAlert.address}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"

                />

            </View>
            {/* price ranges */}
            <View>
                {/* location */}
                <UserLocation
                    setProperty={setZippyAlert}
                    property={zippyAlert}
                    openPicker={openPicker}
                    setOpenPicker={setOpenPicker}
                    title={'Where could you like to stay ?'}
                    placeholder="Enter your  desired location"
                />
                {/* location */}
            </View>
            {/* price ranges */}
        </View>
        {/* location details */}

        {/* create zippy alert */}
        <View style={[{ marginHorizontal: 10 }]}>
            <TouchableOpacity
                activeOpacity={1}
                style={[generalStyles.loginContainer, { width: "100%", backgroundColor:COLORS.primaryDarkRedHex }

                ]}
                // onPress={() => guestUser ? handleShowAlert() : navigation.navigate('ZippyAlert')}
                onPress={onCreateZippyAlert}
            >
                <Text style={generalStyles.loginText}>{'Create Alert'}</Text>
            </TouchableOpacity>
        </View>
        {/* create zippy alert */}

        {/* filter modal */}

        {loading && <ActivityIndicator></ActivityIndicator>}


    </ScrollView>
    )
}

export default ZippyAlert

const styles = StyleSheet.create({
    icon: {
        marginLeft: -20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    borderStyles: {
        borderWidth: 0.5,
        borderBottomWidth: 0.5,
        height: 45,
        borderColor: COLORS.primaryLightGreyHex,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    viewStyles: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 15
    },
    phoneInput: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    countryButton: {
        marginBottom: 20,
    },
    countryPickerButton: {
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    countryPickerCloseButton: {
        width: 20,
        height: 20,
    },
    submitButton: {
        width: '100%',
    },
    textInputMarginRight: {
        marginRight: 15
    },
    touchableStyles: {
        marginHorizontal: 5,
        marginVertical: 5,
        width: 100,
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    hairLineStyles: {
        width: "100%",
        marginVertical: 5,
        borderBottomColor: COLORS.primaryLightGreyHex,
        borderBottomWidth: 0.5
    },
    formContainer: {
        marginVertical: 10,
        marginHorizontal: 0
    },
    labelStyles: {
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.roboto_medium,
        fontSize: 15
    },

    textColor: {
        color: COLORS.primaryBlackHex,
    },
    circleStyles: {
        marginHorizontal: 5,
        marginVertical: 5,
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },

})

{/* filter modal */ }
{/* <FilterModal
            openPicker={openPicker}
            setOpenPicker={setOpenPicker}
            title={'Zippy Alert'}
            categories={categories}
            services={services}
            amentities={amenities}
            zippyAlert={zippyAlert}
            setZippyAlert={setZippyAlert}
            onClearFilter={onClear}
            bedRooms={bedRooms}
            bathRooms={bathRooms}
            onCreateZippyAlert={onCreateZippyAlert}
        /> */}

