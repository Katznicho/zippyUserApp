import { ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import PropertyDetailsCard from './PropertyDetailsCard'
import { useApi } from '../hooks/useApi'
import { COLORS } from '../theme/theme';



const PropertyDetailScrollView = () => {

    const { data, error, isLoading, } = useApi<any>({
        endpoint: '/getAllPropertiesByPagination',
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

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            {
                isLoading ?
                 <ActivityIndicator
                    size={'large'}
                    color={COLORS.primaryOrangeHex}
                /> 
                : data?.data?.data.map((item: any) => (
                    <PropertyDetailsCard
                        key={item.id}
                        property={item}
                    />
                ))
            }

        </ScrollView>
    )
}

export default PropertyDetailScrollView

