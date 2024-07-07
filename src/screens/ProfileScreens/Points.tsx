import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { generalStyles } from '../utils/generatStyles'
import { useApi } from '../../hooks/useApi'
import { COLORS } from '../../theme/theme'
import { ActivityIndicator } from '../../components/ActivityIndicator'

const Points = () => {

    const { data, error, isLoading, } = useApi<any>({
        endpoint: '/app-user/getUserPoints',
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


    if (isLoading)
        return <View style={[generalStyles.ScreenContainer]}>
            <ActivityIndicator />
        </View>

    return (
        <ScrollView
            style={[generalStyles.ScreenContainer]}
            showsVerticalScrollIndicator={false}
        >
            <View style={[generalStyles.flexStyles]}>
                <View style={[styles.containerCard]}>
                    <Text style={[generalStyles.CardTitle]}>Current Points</Text>
                    <Text style={[generalStyles.CardSubtitle]}>{data?.data?.total_points}</Text>
                </View>
                <View style={[styles.containerCard]}>
                    <Text style={[generalStyles.CardTitle]}>User Points</Text>
                    <Text style={[generalStyles.CardSubtitle]}> {data?.data?.used_points}</Text>
                </View>
            </View>

            {/* points usgae */}
            <View style={[styles.containerCard]}>
                <Text style={[generalStyles.CardTitle]}>Points Usage</Text>
            </View>
            { <View>
                {
                    data?.data?.user?.point_usages.length == 0 ? <View style={[styles.containerCard]}>
                        <Text style={[generalStyles.CardSubtitle]}>No Points Used So Far</Text>
                    </View> : data?.data?.point_usages?.map((item: any, index: any) => {
                        return (
                            <View style={[styles.containerCard]} key={index}>
                                <Text style={[generalStyles.CardTitle]}>Points</Text>
                                <Text style={[generalStyles.CardTitle]}>{item?.points}</Text>
                                <Text style={[generalStyles.CardTitle]}>Reason</Text>
                                <Text style={[generalStyles.CardSubtitle]}>{item?.reason}</Text>
                            </View>
                        )
                    })
                }
            </View> }
            {/* points usgae */}
        </ScrollView>
    )
}

export default Points

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