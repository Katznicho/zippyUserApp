/* eslint-disable prettier/prettier */
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import useFetchInfinite from '../../hooks/useFetchInfinite';
import { COMMENTS_BY_ID } from '../utils/constants/routes';
import { generalStyles } from '../utils/generatStyles';
import EmptyContainer from '../../components/EmptyContainer';
import { COLORS, FONTSIZE } from '../../theme/theme';
import ArrowBack from '../../components/ArrowBack';
import SearchBar from '../../components/SearchBar';
import ReviewPropertyFlatList from '../../components/ReviewPropertyFlatList';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AllPropertyComments = () => {
    const { property_id } = useRoute<any>().params;
    const navigation = useNavigation<any>();
    const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite("allpropertyreviews", COMMENTS_BY_ID, null, property_id);

    const reviewData = data?.pages.flatMap(page => page.data);

    const loadMoreData = () => {
        if (hasNextPage && !isFetching && data?.pages[0].total !== reviewData?.length) return fetchNextPage();
    };

    const [searchText, setSearchText] = useState<string>("");
    const resetSearch = () => {
        setSearchText("");
    };

    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>
            {data && reviewData?.length === 0 && <EmptyContainer title={'No Reviews Yet'} />}
            <View style={styles.containerStyle}>
                <View style={[generalStyles.absoluteStyles, { left: 10, top: 25 }]}>
                    <ArrowBack />
                </View>
                <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center", }]}>
                    <Text style={[generalStyles.CardTitle, styles.textColor]}>Reviews</Text>
                </View>
                <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center" }]}>
                    <Text style={[generalStyles.CardSubtitle, styles.textColor, { fontSize: FONTSIZE.size_16 }]}>{reviewData?.length} Results</Text>
                </View>
                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                    resetSearch={resetSearch}
                    placeholder={"Search for reviews"}
                />
            </View>

            <ReviewPropertyFlatList
                reviewData={reviewData}
                loadMoreData={loadMoreData}
                isFetching={isFetching}
                isError={isError}
                error={error}
                searchText={searchText}
                setSearchText={setSearchText}
                resetSearch={resetSearch}
            />

            <TouchableOpacity
                activeOpacity={1}
                style={styles.fab} onPress={() => navigation.navigate("AddReviewScreen", { property_id })}>
                <Icon name="add" size={30} color={COLORS.primaryBlackHex} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AllPropertyComments

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: 20
    },
    textColor: {
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_28
    },
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: 30,
        shadowColor: COLORS.primaryBlackHex,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
});
