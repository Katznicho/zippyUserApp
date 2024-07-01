import { SafeAreaView, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../theme/theme';
import NotificationFlatList from '../../components/NotificationFlatList';
import { USERNOTIFICATIONS } from '../utils/constants/routes';
import useFetchInfinite from '../../hooks/useFetchInfinite';
import { generalStyles } from '../utils/generatStyles';
import EmptyContainer from '../../components/EmptyContainer';


/**
 * Renders the Recent component.
 *
 * @return {JSX.Element} The rendered Recent component.
 */
const All = (): JSX.Element => {


    const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite("allnotifications", USERNOTIFICATIONS);
    
    //flat the data
    // const flattenedData = data?.pages.flatMap(page => page.results) || [];
    const notificationData = data?.pages.flatMap(page => page.data);

    // console.log(notificationData);


    const loadMoreData = () => {
        if (hasNextPage && !isFetching && data?.pages[0].total !== notificationData?.length) return fetchNextPage()
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryBlackHex }}>
            {
                data && notificationData?.length === 0 && <View style={[generalStyles.centerContent]} >
                    <EmptyContainer
                        title={'You dont have any notifications'}
                    />

                </View>
            }
            <NotificationFlatList
                notificationData={notificationData}
                loadMoreData={loadMoreData}
                isFetching={isFetching}
            />
        </SafeAreaView>
    )
}

export default All
