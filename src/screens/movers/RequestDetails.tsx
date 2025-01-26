import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { generalStyles } from '../utils/generatStyles';

const ScreenOne = () => {
    const [carType, setCarType] = useState('Car'); // Default car type
    const [itemDescription, setItemDescription] = useState('');
    const [pickupDateTime, setPickupDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const navigation = useNavigation();

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            // Ensure the date is at least one day ahead
            const today = new Date();
            const minDate = new Date(today.setDate(today.getDate() + 1));
            if (selectedDate < minDate) {
                Alert.alert('Invalid Date', 'Please select a date at least one day in the future.');
            } else {
                setPickupDateTime((prev) => new Date(selectedDate.setHours(prev.getHours(), prev.getMinutes())));
            }
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setPickupDateTime((prev) => new Date(prev.setHours(selectedTime.getHours(), selectedTime.getMinutes())));
        }
    };

    const handleNext = () => {
        if (!itemDescription.trim()) {
            Alert.alert('Validation Error', 'Please enter a description of what you are moving.');
            return;
        }
        navigation.navigate('PickupScreen', { carType, pickupDateTime: pickupDateTime.toISOString(), itemDescription });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.heading}>Mover Request</Text>

            {/* Vehicle Type Selection */}
            <Text style={styles.label}>Select Vehicle Type</Text>
            <View style={styles.carTypeContainer}>
                {['Car', 'Van', 'Lift'].map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[styles.carTypeButton, carType === type && styles.selectedCarType]}
                        onPress={() => setCarType(type)}
                    >
                        <Text style={[styles.carTypeText, carType === type && styles.selectedCarTypeText]}>{type}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Item Description */}
            <Text style={styles.label}>What Are You Moving?</Text>
            <TextInput
                style={styles.input}
                placeholder="E.g., Furniture, boxes..."
                value={itemDescription}
                onChangeText={setItemDescription}
            />

            {/* Pickup Date and Time */}
            <Text style={styles.label}>Select Pickup Date and Time</Text>
            <TouchableOpacity style={styles.timeButton} onPress={() => setShowDatePicker(true)}>
                <Icon name="calendar-today" size={20} color="#007bff" />
                <Text style={styles.timeText}>{pickupDateTime.toDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
                <Icon name="schedule" size={20} color="#007bff" />
                <Text style={styles.timeText}>{pickupDateTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={pickupDateTime}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {showTimePicker && (
                <DateTimePicker
                    value={pickupDateTime}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                />
            )}

            {/* Next Button */}
            <TouchableOpacity 
            style={[
                generalStyles.loginContainer,
                { marginTop: 5 }]
            } onPress={handleNext}
             activeOpacity={1}
            >
                <Text style={generalStyles.loginText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    carTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    carTypeButton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    selectedCarType: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    carTypeText: {
        fontSize: 16,
        color: '#333',
    },
    selectedCarTypeText: {
        color: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    timeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    timeText: {
        fontSize: 16,
        color: '#007bff',
        marginLeft: 10,
    },
    submitButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ScreenOne;
