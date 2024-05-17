import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { generalStyles } from '../screens/utils/generatStyles';

const BookingFlatList: React.FC<any> = ({ propertyData, loadMoreData, isFetching, searchText, setSearchText, resetSearch }: any) => {

    const navigation = useNavigation<any>();
    return (
        <FlatList
            data={propertyData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item?.id)}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => navigation.navigate("BookingDetails", { data: item })}
                    style={[styles.containerCard]}
                    key={item?.id}>

                    <View style={[generalStyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                        <View>
                            <Text style={[generalStyles.CardTitle]}>Name</Text>
                            <Text style={[generalStyles.CardSubtitle]}>{item?.property?.name}</Text>
                            <Text style={[generalStyles.CardTitle]}>Status</Text>
                            <Text style={[generalStyles.CardSubtitle]}>{item?.status}</Text>
                        </View>

                        <View>
                            <TouchableOpacity>
                                <AntDesign name="right" size={20}
                                    color={COLORS.primaryOrangeHex} />
                            </TouchableOpacity>

                        </View>

                    </View>
                </TouchableOpacity>
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

export default BookingFlatList

const styles = StyleSheet.create({
    containerCard: {
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 10,
        padding: 20,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        margin: 10,
    }
})