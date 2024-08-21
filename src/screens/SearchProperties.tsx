import { StyleSheet, SafeAreaView, View, Text } from 'react-native'
import React, { useState } from 'react'
import useFetchInfinite from '../hooks/useFetchInfinite';
import { generalStyles } from './utils/generatStyles';
import PropertyFlatList from '../components/PropertyFlatList';
import { GET_ALL_PROPERTIES_BY_PAGINATION, SEARCH_PROPERTIES, } from './utils/constants/routes';
import { COLORS, FONTSIZE } from '../theme/theme';
import ArrowBack from '../components/ArrowBack';
import SearchBar from '../components/SearchBar';
import EmptyContainer from '../components/EmptyContainer';
import { useRoute } from '@react-navigation/native';
import { useApi } from '../hooks/useApi';




const SearchProperties: React.FC = () => {

    const { category_id } = useRoute<any>().params;

    console.log("==============")
    console.log(category_id)

    const { data, error, isLoading, } = useApi<any>({
        endpoint: '/searchProperties',
        params: {
            "category_id": category_id
        },
        queryOptions: {
            // enabled: true,
            // refetchInterval: 2000,
            // refetchOnWindowFocus: true,
            // refetchOnMount: true,
        },
    })

    console.log('======================')
    console.log(data?.data)





    const loadMoreData = () => {
        // if (hasNextPage && !isFetching && data?.pages[0].total !== propertyData?.length) return fetchNextPage()
    };

    const [searchText, setSearchText] = useState<string>("");
    const resetSearch = () => {
        setSearchText("");
    };


    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>

            {
                data && data?.data?.data?.length === 0 &&<EmptyContainer
                    title={'No Properties Yet'} />
            }
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

            <PropertyFlatList
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

export default SearchProperties

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