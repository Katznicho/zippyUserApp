import { SafeAreaView } from 'react-native'
import React from 'react'
import useFetchInfinite from '../hooks/useFetchInfinite';
import { generalStyles } from './utils/generatStyles';
import { GET_REGISTERED_USERS_BY_PAGE } from './utils/constants/routes';
import UserFlatList from '../components/UserFlatList';
import EmptyContainer from '../components/EmptyContainer';

const AllUsers: React.FC = () => {

    const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite("allUsers", GET_REGISTERED_USERS_BY_PAGE);
    console.log("=========== data=========================")
    console.log(data?.pages[0].total)
    console.log("==========data=====================")


    //flat the data
    // const flattenedData = data?.pages.flatMap(page => page.results) || [];
    const usersData = data?.pages.flatMap(page => page.data);

    console.log("=============users data length==========================")
    console.log(usersData);
    console.log("=============users data length==========================")





    const loadMoreData = () => {
        if (hasNextPage && !isFetching && data?.pages[0].total !== usersData?.length) return fetchNextPage()
    };
    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>
            {
                data && usersData?.length === 0 && <EmptyContainer
                    title={'No Registered property owners Yet'} />
            }
            <UserFlatList
                UserData={usersData}
                loadMoreData={loadMoreData}
                isFetching={isFetching}
            />

        </SafeAreaView >
    )
}

export default AllUsers

