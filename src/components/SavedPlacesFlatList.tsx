import { FlatList, View, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import PropertyCard from './PropertyCard';
import { ActivityIndicator } from './ActivityIndicator';
import ZippyAlertButton from './ZippyAlertButton';
import { generalStyles } from '../screens/utils/generatStyles';
import EmptyContainer from './EmptyContainer';



const SavedPlacesFlatList: React.FC<any> = ({ propertyData, loadMoreData, isFetching, searchText, setSearchText, resetSearch }: any) => {

    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        // Reset search when searchText becomes empty
        if (!searchText) {
            resetSearch();
        }
    }, [searchText, resetSearch]);

    const filteredData = searchText
        ? propertyData.filter((property: any) =>
            property.property?.name.toLowerCase().includes(searchText.toLowerCase()) ||
            property.property?.description?.toLowerCase().includes(searchText.toLowerCase()) ||
            property?.property?.category?.name?.toLowerCase().includes(searchText.toLowerCase())||
            property?.property?.location?.toLowerCase().includes(searchText.toLowerCase())

        )
        : propertyData;

    useEffect(() => {
        // Check if there are no results after filtering
        if (searchText && filteredData.length === 0) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
    }, [filteredData, searchText]);


    if (propertyData == undefined || propertyData == null) {
        return <ActivityIndicator />
    }
    if (noResults) {
        return (
            <SafeAreaView style={[generalStyles.ScreenContainer]}>
                <View style={[generalStyles.centerContent, generalStyles.viewStyles]} >
                    <EmptyContainer
                        title={'No properties found'}
                    />
                    <View >

                        <ZippyAlertButton 
                        />

                    </View>

                </View>
            </SafeAreaView>
        );
    }
    
    return (

        <FlatList
            data={filteredData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item?.id)}
            renderItem={({ item, index }) => (
                <PropertyCard
                    property={item?.property}
                    index={index}
                    nextScreen={false}
                />
            )}
            onEndReached={() => {
                loadMoreData()
            }}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={isFetching && <ActivityIndicator />}
            // refreshControl={isFetching && <ActivityIndicator />}
            onRefresh={loadMoreData}
            refreshing={isFetching}
            contentContainerStyle={{ paddingBottom: 50 }}
        />


    )
}

export default SavedPlacesFlatList

