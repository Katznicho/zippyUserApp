import { SafeAreaView } from 'react-native'
import React from 'react'
import useFetchInfinite from '../hooks/useFetchInfinite';
import PaymentFlatList from '../components/PaymentFlatList';
import { generalStyles } from './utils/generatStyles';
import { USERPAYMENTS } from './utils/constants/routes';
import EmptyContainer from '../components/EmptyContainer';


const AllTransactions = () => {
    const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite("payments", USERPAYMENTS);



    //flat the data
    // const flattenedData = data?.pages.flatMap(page => page.results) || [];
    const paymentData = data?.pages.flatMap(page => page.data);


    const loadMoreData = () => {
        if (hasNextPage && !isFetching && data?.pages[0].total !== paymentData?.length) return fetchNextPage()
    };




    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>
            {
                data && paymentData?.length === 0 && <EmptyContainer
                    title={'No Transactions'} />
            }
            <PaymentFlatList
                paymentData={paymentData}
                loadMoreData={loadMoreData}
                isFetching={isFetching}
            />

        </SafeAreaView >
    )
}

export default AllTransactions

