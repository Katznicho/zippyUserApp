import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ToastAndroid } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import ProductCard from './ProductCard';
import { useNavigation } from '@react-navigation/native';


const ProductType = ({ dataList, type }: any) => {
    const navigation = useNavigation<any>();

    const ProductCardAddToCart = ({
        id,
        index,
        name,
        roasted,
        imagelink_square,
        special_ingredient,
        type,
        prices,
    }: any) => {
        // addToCart({
        //     id,
        //     index,
        //     name,
        //     roasted,
        //     imagelink_square,
        //     special_ingredient,
        //     type,
        //     prices,
        // });
        // calculateCartPrice();
        ToastAndroid.showWithGravity(
            `${name} is Added to Cart`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    return (
        <View>
            <Text style={styles.CoffeeBeansTitle}>{type}</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dataList}
                contentContainerStyle={[
                    styles.FlatListContainer,
                    { marginBottom: 10 },
                ]}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.push('Details', {
                                    index: item.index,
                                    id: item.id,
                                    type: item.type,
                                });
                            }}>
                            <ProductCard
                                id={item.id}
                                index={item?.id}
                                type={item?.category?.name}
                                roasted={item?.description}
                                imagelink_square={item?.cover_image}
                                name={item?.name}
                                special_ingredient={item?.user?.name}
                                average_rating={item?.rating}
                                price={item?.total_amount ?? 0}
                                buttonPressHandler={ProductCardAddToCart}
                            />
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    )
}

export default ProductType

const styles = StyleSheet.create({

    FlatListContainer: {
        gap: SPACING.space_20,
        paddingVertical: SPACING.space_20,
        paddingHorizontal: SPACING.space_30,
    },
    EmptyListContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_36 * 3.6,
    },
    CoffeeBeansTitle: {
        fontSize: FONTSIZE.size_18,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_15,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    },
    cardStyles: {
        borderWidth: 1,
        borderColor: COLORS.primaryOrangeHex,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        backgroundColor: COLORS.primaryOrangeHex,
        width: 150,
        height: 150,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: "center",
        elevation: 5,
        color: COLORS.primaryWhiteHex

    },
    textStyles: {
        fontWeight: "bold",
        color: COLORS.primaryWhiteHex
        // fontSize: 18
    },
    iconStyles: {
        marginBottom: 10
    }
});