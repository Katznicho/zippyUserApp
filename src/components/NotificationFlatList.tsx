/* eslint-disable prettier/prettier */
import React from 'react'
import NotificationCard from './NotificationCard'
import { FlatList } from 'react-native'




const NotificationFlatList = ({ notificationData, loadMoreData, isFetching }: any) => {
  return (
    <FlatList
      data={notificationData}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item: { id: any }) => String(item?.id)}
      style={{ marginHorizontal: 10 }}
      renderItem={({ item, index }: any) => (
        <NotificationCard
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

export default NotificationFlatList

