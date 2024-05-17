import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../hooks/useApi';
import { FONTFAMILY, COLORS } from '../theme/theme';



const Categories = () => {
    const navigation = useNavigation<any>()

    const { data, error, isLoading, } = useApi<any>({
        endpoint: '/getAllCategories',
        params: {
            "account": "hasWalletAccount"
        },
        queryOptions: {
            // enabled: true,
            // refetchInterval: 2000,
            // refetchOnWindowFocus: true,
            // refetchOnMount: true,
        },
    })
    //https://zippyug.com/api/v1/getAllCategories


    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {
                isLoading ? null : data?.data?.map((item: any) => (

                    <TouchableOpacity
                        key={item.id}
                        // style={[generalStyles.CardContainer]}
                        activeOpacity={1}
                        style={styles.container}
                        onPress={() => navigation.navigate("AllProperties")}
                    >
                        <Text style={[styles.textStyle]}>{item.name}</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: COLORS.primaryBlackHex,
        padding:15,
        // height:20,
        borderRadius: 20,
    },
    textStyle:{
        color: COLORS.primaryWhiteHex,
        fontSize: 15,
        fontFamily:FONTFAMILY.roboto_regular
    }
})