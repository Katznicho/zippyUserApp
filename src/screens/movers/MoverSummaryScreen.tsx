import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import { CREATE_REQUEST } from '../utils/constants/routes';
import { useNavigation } from '@react-navigation/native';


const MoverSummaryScreen = ({ route }: any) => {

    const { authToken } = useSelector((state: RootState) => state?.user);
    const {
        carType,
        pickupCoords,
        pickupAddress,
        destinationCoords,
        destinationAddress,
        pickupDateTime,
        itemDescription
    } = route.params;

    const navigation =  useNavigation<any>();

    const [loading, setLoading] = useState<boolean>(false)

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    const distance = calculateDistance(
        pickupCoords.latitude,
        pickupCoords.longitude,
        destinationCoords.latitude,
        destinationCoords.longitude
    );

    const calculatePrice = (distance: number) => {
        const basePrice = 5000; // Example base price
        const pricePerKm = 5000; // Price per kilometer
        return basePrice + distance * pricePerKm;
    };

    const price = calculatePrice(distance);

    const [paymentOption, setPaymentOption] = useState('Cash');
    const [additionalNotes, setAdditionalNotes] = useState('');

    //CREATE_REQUEST

    const onConfirm = async () => {
        if (paymentOption === 'Pay Now') {
            return showMessage({
                message: 'Coming Soon',
                description: 'The Pay Now feature is currently under development.',
                type: 'info',
                duration: 3000,
                icon: 'info',
            });
        }

        setLoading(true);


        try {
            const requestData = {
                car_type: carType,
                moved_item: itemDescription,
                pickup_address: pickupAddress?.address,
                pickup_lat: pickupCoords.latitude,
                pickup_long: pickupCoords.longitude,
                dropoff_address: destinationAddress?.address,
                dropoff_lat: destinationCoords.latitude,
                dropoff_long: destinationCoords.longitude,
                price: parseInt(price),
                payment_method: paymentOption,
                status: 'pending',
                // pickup_date: pickupDateTime, // Rep
                pickup_date:new Date(pickupDateTime).toISOString().slice(0, 19).replace('T', ' '),
                notes: additionalNotes || null,
            };

            const response = await fetch(`${CREATE_REQUEST}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(requestData),
            });

            const responseData = await response.json();



            if (responseData.success) {
                showMessage({
                    message: 'Success',
                    description: 'Your request has been created successfully.',
                    type: 'success',
                    duration: 3000,
                    icon: 'success',
                });
               return navigation.navigate('MoverRequests');
            } else {
                throw new Error(responseData.message || 'Failed to create request.');
            }
        } catch (error) {
            showMessage({
                message: 'Error',
                description: error.message || 'Something went wrong. Please try again.',
                type: 'danger',
                duration: 3000,
                icon: 'danger',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Mover Summary</Text>

            {/* Car Type */}
            <View style={styles.card}>
                <View style={styles.infoRow}>
                    <Icon name="directions-car" size={28} color="#007bff" />
                    <Text style={styles.infoText}>{carType}</Text>
                </View>
            </View>

            {/* Item Description */}
            <View style={styles.card}>
                <View style={styles.infoRow}>
                    <Icon name="description" size={28} color="#007bff" />
                    <Text style={styles.infoText}>{itemDescription}</Text>
                </View>
            </View>

            {/* Pickup Address */}
            <View style={styles.card}>
                <View style={styles.infoRow}>
                    <Icon name="place" size={28} color="#007bff" />
                    <Text style={styles.infoText}>{pickupAddress?.address}</Text>
                </View>
            </View>

            {/* Pickup Date */}
            <View style={styles.card}>
                <View style={styles.infoRow}>
                    <Icon name="event" size={28} color="#007bff" />
                    <Text style={styles.infoText}>{
                         new Date(pickupDateTime).toISOString().slice(0, 19).replace('T', ' ')
                        }</Text>
                </View>
            </View>

            {/* Destination Address */}
            <View style={styles.card}>
                <View style={styles.infoRow}>
                    <Icon name="flag" size={28} color="#007bff" />
                    <Text style={styles.infoText}>{destinationAddress?.address}</Text>
                </View>
            </View>

            {/* Distance */}
            <View style={styles.card}>
                <View style={styles.infoRow}>
                    <Icon name="swap-horiz" size={28} color="#007bff" />
                    <Text style={styles.infoText}>{distance.toFixed(2)} km</Text>
                </View>
            </View>

            {/* Price */}
            <View style={styles.card}>
                <View style={styles.infoRow}>
                    <Icon name="attach-money" size={28} color="#007bff" />
                    <Text style={styles.infoText}>
                        UGX {parseInt(price).toLocaleString('en-UG')}
                    </Text>
                </View>
            </View>


            {/* Payment Options */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Payment Option</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[
                            styles.paymentButton,
                            paymentOption === 'Cash' && styles.selectedButton,
                        ]}
                        onPress={() => setPaymentOption('Cash')}
                    >
                        <Icon
                            name="money"
                            size={24}
                            color={paymentOption === 'Cash' ? '#fff' : '#333'}
                        />
                        <Text
                            style={[
                                styles.buttonText,
                                paymentOption === 'Cash' && styles.selectedText,
                            ]}
                        >
                            Cash
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.paymentButton,
                            paymentOption === 'Pay Now' && styles.selectedButton,
                        ]}
                        onPress={() => setPaymentOption('Pay Now')}
                    >
                        <Icon
                            name="credit-card"
                            size={24}
                            color={paymentOption === 'Pay Now' ? '#fff' : '#333'}
                        />
                        <Text
                            style={[
                                styles.buttonText,
                                paymentOption === 'Pay Now' && styles.selectedText,
                            ]}
                        >
                            Pay Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Notes */}
            <View style={styles.card}>
                <TextInput
                    style={styles.notesInput}
                    placeholder="Additional details..."
                    placeholderTextColor="#999"
                    multiline
                    returnKeyLabel='done'
                    returnKeyType='done'
                    value={additionalNotes}
                    onChangeText={setAdditionalNotes}
                />
            </View>

            {/* Confirm Button */}
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm} activeOpacity={1}>
                <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator />}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#f4f6f9', flexGrow: 1, paddingBottom: 100 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 4,
    },
    infoRow: { flexDirection: 'row', alignItems: 'center' },
    infoText: { marginLeft: 12, fontSize: 16, color: '#555' },
    buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    paymentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedButton: { backgroundColor: '#007bff', borderColor: '#007bff' },
    buttonText: { marginLeft: 8, fontSize: 16, color: '#333' },
    selectedText: { color: '#fff' },
    notesInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        height: 100,
        textAlignVertical: 'top',
    },
    confirmButton: {
        backgroundColor: '#007bff',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },
    confirmText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default MoverSummaryScreen;
