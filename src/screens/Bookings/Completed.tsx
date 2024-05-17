import { StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import useFetchInfinite from '../../hooks/useFetchInfinite';
import { USERBOOKINGS } from '../utils/constants/routes';
import { generalStyles } from '../utils/generatStyles';
import { COLORS, FONTSIZE } from '../../theme/theme';
import BookingFlatList from '../../components/BookingFlatList';
import EmptyContainer from '../../components/EmptyContainer';

const Completed = () => {
  const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite("COMPLETED", USERBOOKINGS, "Completed");


  const bookingData = data?.pages.flatMap(page => page.data);

  const loadMoreData = () => {
    if (hasNextPage && !isFetching && data?.pages[0].total !== bookingData?.length) return fetchNextPage()
  };

  const [searchText, setSearchText] = useState<string>("");
  const resetSearch = () => { setSearchText("") };
  return (
    <SafeAreaView style={[generalStyles.ScreenContainer]}>

      {
        data && bookingData?.length === 0 && <EmptyContainer
          title={'No Completed bookings Yet'} />
      }
      <BookingFlatList
        propertyData={bookingData}
        loadMoreData={loadMoreData}
        isFetching={isFetching}
        isError={isError}
        error={error}
        searchText={searchText}
        setSearchText={setSearchText}
        resetSearch={resetSearch}
      />

    </SafeAreaView >
  )
}

export default Completed

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