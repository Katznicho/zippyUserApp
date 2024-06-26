import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { generalStyles } from '../utils/generatStyles'
import { useApi } from '../../hooks/useApi'
import { ActivityIndicator } from '../../components/ActivityIndicator'
import { COLORS } from '../../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const AllAlerts = () => {
    const { data, error, isLoading, } = useApi<any>({
        endpoint: '/app-user/getUserAlerts',
        params: {
            "account": "hasWalletAccount"
        },
        queryOptions: {
            enabled: true,
            refetchInterval: 2000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    })

    const navigation = useNavigation<any>()

    if (isLoading)
        return <View style={[generalStyles.ScreenContainer]}>
            <ActivityIndicator />
        </View>
    return (
        <ScrollView
            style={[generalStyles.ScreenContainer]}
            showsVerticalScrollIndicator={false}
        >

            {/* points usgae */}
            <View>
                {
                    data?.alerts.length == 0 ? <View style={[styles.containerCard]}>
                        <Text style={[generalStyles.CardSubtitle]}>No Alerts Created</Text>
                    </View> : data?.alerts?.map((item: any, index: any) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => navigation.navigate("AlertDetails", { data: item })}
                                style={[styles.containerCard]}
                                key={item?.id}>

                                <View style={[generalStyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                                    <View>
                                        <Text style={[generalStyles.CardTitle]}>Title</Text>
                                        <Text style={[generalStyles.CardSubtitle]}>{item?.title}</Text>
                                        <Text style={[generalStyles.CardTitle]}>Category</Text>
                                        <Text style={[generalStyles.CardSubtitle]}>{item?.category?.name}</Text>
                                    </View>

                                    <View>
                                        <TouchableOpacity>
                                            <AntDesign name="right" size={20}
                                                color={COLORS.primaryOrangeHex} />
                                        </TouchableOpacity>

                                    </View>

                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            {/* points usgae */}
        </ScrollView>
    )
}

export default AllAlerts

const styles = StyleSheet.create({
    containerCard: {
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 10,
        padding: 20,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        margin: 10,
    }
})

