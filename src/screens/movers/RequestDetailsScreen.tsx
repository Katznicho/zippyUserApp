import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RequestDetailsScreen = ({ route, navigation }) => {
    const { request } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Request Details</Text>

            <View style={styles.detailCard}>
                <DetailItem icon="directions-car" label="Car Type" value={request.carType} />
                <DetailItem icon="place" label="Pickup Address" value={request.pickupAddress} />
                <DetailItem icon="flag" label="Destination Address" value={request.destinationAddress} />
                <DetailItem icon="attach-money" label="Price" value={request.price} />
                <DetailItem icon="credit-card" label="Payment Method" value={request.paymentMethod} />
                <DetailItem icon="note" label="Notes" value={request.notes} />
                <DetailItem icon="info" label="Status" value={request.status} />
            </View>
        </ScrollView>
    );
};

// Back button using navigation
RequestDetailsScreen.navigationOptions = ({ navigation }) => ({
    headerLeft: () => (
        <Icon
            name="arrow-back"
            size={30}
            color="#333"
            style={{ marginLeft: 15 }}
            onPress={() => navigation.goBack()}
        />
    ),
});

const DetailItem = ({ icon, label, value }) => (
    <View style={styles.detailRow}>
        <Icon name={icon} size={24} color="#555" />
        <View style={styles.textContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9' },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
    },
    detailCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    textContainer: { marginLeft: 10 },
    label: { fontSize: 14, color: '#999' },
    value: { fontSize: 16, fontWeight: 'bold', color: '#333' },
});

export default RequestDetailsScreen;
