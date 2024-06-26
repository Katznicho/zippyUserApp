import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react'
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS, FONTSIZE } from '../theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { calculateDistance, formatCurrency, limitDescription } from '../screens/utils/helpers/helpers';
import { useNavigation } from '@react-navigation/native';
import useGetUserLocation from '../hooks/useGetUserLocation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const PropertyDetailsCard = ({ property }: any) => {



    const navigation = useNavigation<any>();
    const { position } = useGetUserLocation();






    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.container]}
            // onPress={() => navigation.navigate("PropertyDetails", { data: property, position: position })}
            onPress={() => navigation.navigate("PropertyStack", { screen: "PropertyDetails", params: { data: property, position: position } })}

        >
            <View
                style={[styles.imageContainer]}
            >
                <Image
                    source={{ uri: property?.cover_image }}
                    style={styles.imageStyles}
                />

            </View>

            {/* </View> */}
            <View>

                <View style={[styles.viewStyles, styles.verticalPadding]}>
                    <Text style={[generalStyles.CardTitle]}>{property?.name}</Text>

                </View>

                <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between", marginHorizontal: 5 }]}>
                    <Text style={[generalStyles.CardSubtitle]}>{property?.category?.name}</Text>
                    <View style={[generalStyles.flexStyles, { alignItems: "center" }]}>
                        {
                            Array(4).fill(0).map((_, index) => (
                                <AntDesign
                                    key={index}
                                    name="star"
                                    size={12}
                                    color={"gold"}
                                />
                            ))
                        }
                    </View>

                </View>

                <View style={[{ marginLeft: 3, marginVertical: 2 }]}>
                    <Text style={[generalStyles.CardSubtitle]}>{limitDescription(property?.description, 10)}</Text>
                </View>

                <View style={[generalStyles.flexStyles, { alignItems: "center" }]}>
                    <Entypo name="location-pin"
                        size={20}
                        color={COLORS.primaryOrangeHex}
                    />
                    <Text style={[generalStyles.CardTitle, { fontSize: FONTSIZE.size_10 }]}>{property?.location}</Text>
                </View>

                <View style={[generalStyles.flexStyles, { alignItems: "center" }]}>
                    <FontAwesome5 name="ruler-horizontal"
                        size={20}
                        color={COLORS.primaryOrangeHex}
                    />
                    <Text style={[generalStyles.CardTitle, { fontSize: FONTSIZE.size_10 }]}>
                        {calculateDistance(position?.latitude, position?.longitude, property.lat, property.long)}
                        km(s) from you
                    </Text>
                </View>

                {/* <View style={[generalStyles.flexStyles, { alignItems: "center" }]}>
                    <View style={[generalStyles.flexStyles, { alignItems: "center" }]}>
                        <MaterialIcons name="meeting-room"
                            size={18}
                            color={COLORS.primaryOrangeHex}
                            style={{ marginHorizontal: 3 }}

                        />

                        <Text style={[generalStyles.CardTitle, { fontSize: FONTSIZE.size_10, marginTop: 5 }]}>{property?.number_of_rooms} rooms</Text>

                    </View>
                    <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center" }]}>

                        <FontAwesome name="bathtub"
                            size={18}
                            color={COLORS.primaryOrangeHex}
                            style={{ marginHorizontal: 5 }}
                        />

                        <Text style={[generalStyles.CardTitle, { fontSize: FONTSIZE.size_10, marginTop: 5 }]}>{property?.number_of_baths} bathrooms</Text>

                    </View>
                </View> */}

                <View style={[generalStyles.flexStyles, { alignItems: "center", marginVertical: 5, marginHorizontal: 3 }]}>
                    <Text style={[generalStyles.CardTitle]}>
                        {property?.currency?.name} {formatCurrency(property?.price)}
                    </Text>

                    <Text style={[generalStyles.CardSubtitle]}> {property?.payment_period?.name}</Text>
                </View>


            </View>

        </TouchableOpacity>
    )
}

export default PropertyDetailsCard

const styles = StyleSheet.create({
    imageStyles: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
        // borderRadius: 10
    },
    imageContainer: {
        width: 220,
        height: 150,
        elevation: 10,
        // marginHorizontal: 10,
        // marginVertical: 10,
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        alignContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: 220,
        height: 280,
        elevation: 10,
        marginHorizontal: 3,
        marginVertical: 10,
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        alignContent: 'center',
        alignItems: 'center',
    },
    viewStyles: {
        // marginHorizontal: 5,
        // marginVertical: 2
    },
    verticalPadding: {
        paddingVertical: 5
    }
})