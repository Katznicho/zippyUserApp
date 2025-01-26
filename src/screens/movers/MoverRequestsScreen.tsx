import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../../hooks/useApi';

const MoverRequestsScreen = () => {
    const { data, error, isLoading } = useApi<any>({
        endpoint: '/app-user/getUserMoveRequests',
        queryOptions: {
            enabled: true,
            refetchInterval: 2000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    });

    const navigation = useNavigation();

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'pending':
                return { backgroundColor: '#ffc107', color: '#fff' };
            case 'accepted':
                return { backgroundColor: '#17a2b8', color: '#fff' };
            case 'in-Progress':
                return { backgroundColor: '#007bff', color: '#fff' };
            case 'completed':
                return { backgroundColor: '#28a745', color: '#fff' };
            default:
                return { backgroundColor: '#6c757d', color: '#fff' };
        }
    };

    const renderRequest = ({ item }: any) => {
        const statusStyle = getStatusStyle(item.status);

        return (
            <TouchableOpacity
                style={styles.requestCard}
                onPress={() => navigation.navigate('RequestDetails', { request: item })}
                activeOpacity={1}
            >
                <View style={styles.infoContainer}>
                    <Icon name="directions-car" size={20} color="#555" />
                    <Text style={styles.value}>{item.car_type}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Icon name="place" size={20} color="#555" />
                    <Text style={styles.value}>{item.pickup_address}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Icon name="flag" size={20} color="#555" />
                    <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">
                        {item.dropoff_address}
                    </Text>
                </View>

                <View style={styles.infoContainer}>
                    <Icon name="attach-money" size={20} color="#555" />
                    <Text style={styles.value}>{`UGX ${item.price}`}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.status, statusStyle]}>{item.status}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    if (error || !data?.data?.length) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No requests found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Requests</Text>
            <FlatList
                data={data.data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderRequest}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9' },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        color: '#333',
    },
    listContainer: { paddingHorizontal: 15 },
    requestCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    value: {
        marginLeft: 8,
        fontSize: 14,
        color: '#555',
        flex: 1,
    },
    status: {
        marginTop: 8,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 12,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
    },
});

export default MoverRequestsScreen;
