/* eslint-disable prettier/prettier */
import { StyleSheet, SafeAreaView, View, Text } from 'react-native'
import React, { useState } from 'react'
import { GET_APP_USER_LIKES } from '../utils/constants/routes';
import useFetchInfinite from '../../hooks/useFetchInfinite';
import { generalStyles } from '../utils/generatStyles';
import EmptyContainer from '../../components/EmptyContainer';
import ArrowBack from '../../components/ArrowBack';
import { COLORS, FONTSIZE } from '../../theme/theme';
import SearchBar from '../../components/SearchBar';
import SavedPlacesFlatList from '../../components/SavedPlacesFlatList';
import { useApi } from '../../hooks/useApi';

const AllSavedPlaces: React.FC = () => {

    // const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite("AllSavedPlaces", GET_APP_USER_LIKES,null,null , null);


    // const propertyData = data?.pages.flatMap(page => page.data);


    const loadMoreData = () => {
        //if (hasNextPage && !isFetching && data?.pages[0].total !== propertyData?.length) return fetchNextPage()
        return false
    };

    const { data, error, isLoading } = useApi<any>({
        endpoint: '/app-user/getUserLikes',
        queryOptions: {
             enabled: true,
            // refetchInterval: 2000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    });



    const [searchText, setSearchText] = useState<string>("");
    const resetSearch = () => {
        setSearchText("");
    };



    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>

            
            <View style={styles.containerStyle}>
                <View style={[generalStyles.absoluteStyles, { left: 10, top: 25 }]}>
                    <ArrowBack/>
                </View>
                <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center", }]}>

                    <Text style={[generalStyles.CardTitle, styles.textColor]}>Properties</Text>
                </View>
                <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center" }]}>
                    <Text style={[generalStyles.CardSubtitle, styles.textColor, { fontSize: FONTSIZE.size_16 }]}>{data?.data?.data?.length} Results</Text>
                </View>
                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                    resetSearch={resetSearch}
                />
            </View>

            {
        data && data?.data?.data?.length === 0 &&<EmptyContainer
            title={'You don\'t have any saved places'} />
    }

            <SavedPlacesFlatList
                propertyData={data?.data?.data}
                loadMoreData={loadMoreData}
                isFetching={false}
                isError={false}
                error={error}
                searchText={searchText}
                setSearchText={setSearchText}
                resetSearch={resetSearch}
            /> 

        </SafeAreaView >
    )
}

export default AllSavedPlaces

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: 20
    },
    textColor: {
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_28
    },
})