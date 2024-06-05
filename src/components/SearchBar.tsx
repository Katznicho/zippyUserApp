import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


const SearchBar = ({ placeholder = "Search for properties", searchText, setSearchText, resetSearch }: any) => {



    return (
        <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between', }]}>
            {/* Search Input */}

            <View style={styles.InputContainerComponent}>
                <TouchableOpacity
                    onPress={() => {
                        // searchCoffee(searchText);
                        setSearchText();
                    }}>
                    <EvilIcons
                        style={styles.InputIcon}
                        name="search"
                        size={FONTSIZE.size_28}
                        color={
                            searchText.length > 0
                                ? COLORS.primaryOrangeHex
                                : COLORS.primaryLightGreyHex
                        }
                    />
                </TouchableOpacity>
                <TextInput
                    placeholder={placeholder}
                    value={searchText}
                    onChangeText={text => {
                        return setSearchText(text);
                    }}
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    style={styles.TextInputContainer}
                />
                {searchText.length > 0 ? (
                    <TouchableOpacity
                        onPress={() => {
                            return resetSearch();
                        }}>
                        <AntDesign
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

export default SearchBar

const styles = StyleSheet.create({

    InputContainerComponent: {
        flexDirection: 'row',
        marginVertical: SPACING.space_10,
        marginHorizontal: SPACING.space_10,
        borderRadius: 30,
        backgroundColor: COLORS.primaryBlackHex,
        alignItems: 'center',
        flex: 1,
        elevation: 5
    },
    InputIcon: {
        marginHorizontal: SPACING.space_10,
    },
    TextInputContainer: {
        flex: 1,
        height: SPACING.space_20 * 2.7,
        fontFamily: FONTFAMILY.roboto_regular,
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