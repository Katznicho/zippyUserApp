import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { generalStyles } from '../screens/utils/generatStyles';

const HomeSearchBar = ({ openPicker, setOpenPicker }: any) => {

    const [searchText, setSearchText] = useState('');

    const resetSearchCoffee = () => {
        setSearchText('');
    };

    return (
        <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between', }]}>
            {/* Search Input */}

            <View style={styles.InputContainerComponent}>
                <TouchableOpacity
                    onPress={() => {
                        // searchCoffee(searchText);
                    }}>
                    <CustomIcon
                        style={styles.InputIcon}
                        name="search"
                        size={FONTSIZE.size_18}
                        color={
                            searchText.length > 0
                                ? COLORS.primaryOrangeHex
                                : COLORS.primaryLightGreyHex
                        }
                    />
                </TouchableOpacity>
                <TextInput
                    placeholder="Find Your Dream Hzouse..."
                    value={searchText}
                    onChangeText={text => {
                        setSearchText(text);
                        // searchCoffee(text);
                    }}
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    style={styles.TextInputContainer}
                />
                {searchText.length > 0 ? (
                    <TouchableOpacity
                        onPress={() => {
                            resetSearchCoffee();
                        }}>
                        <CustomIcon
                            style={styles.InputIcon}
                            name="close"
                            size={FONTSIZE.size_16}
                            color={COLORS.primaryLightGreyHex}
                        />
                    </TouchableOpacity>
                ) : (
                    <></>
                )}
            </View>


        </View>
    )
}

export default HomeSearchBar

const styles = StyleSheet.create({

    InputContainerComponent: {
        flexDirection: 'row',
        marginVertical: SPACING.space_10,
        marginHorizontal: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_25,
        backgroundColor: COLORS.primaryBlackHex,
        alignItems: 'center',
        flex: 0.9
    },
    InputIcon: {
        marginHorizontal: SPACING.space_10,
    },
    TextInputContainer: {
        flex: 0.9,
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.roboto_bold,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    },
    filterContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDERRADIUS.radius_25,
        borderColor: COLORS.primaryBlackHex,
        backgroundColor: COLORS.primaryBlackHex,
        borderWidth: 0.5,
        marginRight: 10,
        padding: 10
    }
})