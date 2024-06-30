import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { generalStyles } from '../screens/utils/generatStyles';
import EmptyContainer from './EmptyContainer';
import Comment from './Comment';

const ReviewPropertyFlatList = ({ reviewData, loadMoreData, isFetching, searchText, setSearchText, resetSearch }: any) => {

    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        // Reset search when searchText becomes empty
        if (!searchText) {
            resetSearch();
        }
    }, [searchText, resetSearch]);

    const filteredData = searchText
        ? reviewData.filter((review: any) =>
            review?.body?.toLowerCase().includes(searchText.toLowerCase()) ||
            review.app_user?.name?.toLowerCase().includes(searchText.toLowerCase())
        )
        : reviewData;

    useEffect(() => {
        // Check if there are no results after filtering
        if (searchText && filteredData.length === 0) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
    }, [filteredData, searchText]);


    if (reviewData == undefined || reviewData == null) {
        return <ActivityIndicator />
    }
    if (noResults) {
        return (
            <SafeAreaView style={[generalStyles.ScreenContainer]}>
                <View style={[generalStyles.centerContent, generalStyles.viewStyles]} >
                    <EmptyContainer
                        title={'No reviews found'}
                    />


                </View>
            </SafeAreaView>
        );
    }

    return (
        <FlatList
            data={filteredData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: { id: any; }) => String(item?.id)}
            renderItem={({ item, index }: any) => (
                <Comment
                    item={item}
                    index={index}
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

export default ReviewPropertyFlatList

const styles = StyleSheet.create({})