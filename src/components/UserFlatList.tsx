import { FlatList } from 'react-native'
import React from 'react'
import { ActivityIndicator } from './ActivityIndicator';
import UserCard from './UserCard';
// import UserCard from './PropertyCard';



const UserFlatList: React.FC<any> = ({ UserData, loadMoreData, isFetching }: any) => {


    console.log("===========flat list user data==========")
    console.log(UserData)

    if (UserData == undefined || UserData == null) {
        return <ActivityIndicator />
    }
    return (
        <FlatList
            data={UserData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item?.id)}
            renderItem={({ item, index }) => (
                <UserCard item={item} index={index} />
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

export default UserFlatList

