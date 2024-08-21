/* eslint-disable prettier/prettier */
import { ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import PropertyDetailsCard from './PropertyDetailsCard';
import { useApi } from '../hooks/useApi';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';

const PropertyDetailScrollView = () => {
    const { data, error, isLoading } = useApi<any>({
        endpoint: '/getAllPropertiesByPagination',
        queryOptions: {
            // enabled: true,
            // refetchInterval: 2000,
            // refetchOnWindowFocus: true,
            // refetchOnMount: true,
        },
    });

    // Slice the first 8 items if data is available
    const propertiesToShow = data?.data?.data.slice(0, 6) || [];

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
                    style={[generalStyles.centerContent]}
                /> 
                : propertiesToShow.map((item: any) => (
                    <PropertyDetailsCard
                        key={item.id}
                        property={item}
                    />
                ))
            }
        </ScrollView>
    );
};

export default PropertyDetailScrollView;
