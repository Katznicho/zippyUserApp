import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { generalStyles } from '../utils/generatStyles'
import { DEFAULT_USER_PROFILE, PUBLIC_STORAGE } from '../utils/constants/constants'
import { onMakeCall } from '../utils/helpers/helpers'
import FourAgentReview from '../../components/FourAgentReview'

const AgentProfile = () => {
    const { agent } = useRoute<any>().params

    console.log(agent)

    const [totalProperties, setTotalProperties] = useState<number>(10)

    const getImageUrl = (displayPicture: string | null) => {
        return displayPicture ? `${PUBLIC_STORAGE}profile/${displayPicture}` : DEFAULT_USER_PROFILE;
    }

    return (
        <View style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                style={{ paddingBottom: 100 }}
            >
                <View style={styles.card}>
                    <View style={styles.profileContainer}>
                        <Image
                            source={{ uri: getImageUrl(agent.avatar) }}
                            style={styles.profileImage}
                        />
                        <Text style={styles.name}>{agent.name}</Text>
                        <Text style={styles.email}>{agent.email}</Text>
                        <Text style={styles.phone}>{agent.phone_number}</Text>
                        <Text style={styles.totalProperties}>Total Properties: {totalProperties}</Text>
                        <TouchableOpacity style={styles.callButton} onPress={() => onMakeCall(agent.phone_number)}>
                            <Text style={styles.callButtonText}>Call Agent</Text>
                        </TouchableOpacity>
                    </View>
                    <FourAgentReview 
                    agent_id={agent.id}
                     />
                </View>
            </ScrollView>
        </View>
    )
}

export default AgentProfile

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    profileContainer: {
        alignItems: 'center',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    phone: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    totalProperties: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    callButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    callButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
