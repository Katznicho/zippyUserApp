import { StyleSheet, ScrollView, ImageBackground, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { generalStyles } from './utils/generatStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useNavigation, useRoute } from '@react-navigation/native'
import {  SPACING } from '../theme/theme'
import { PUBLIC_STORAGE } from './utils/constants/constants'
import ArrowBack from '../components/ArrowBack'

const PropertyImages = () => {

    const tabBarHeight = useBottomTabBarHeight();
    const { item } = useRoute<any>().params
    const navigation = useNavigation<any>();

    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: tabBarHeight }}
                keyboardShouldPersistTaps="always"
            >
                {/* show background image */}
                <ImageBackground
                    source={{ uri: `${PUBLIC_STORAGE}/properties/${item?.cover_image}` }}
                    style={styles.ItemBackgroundImage}
                >
                    {/* back handler */}
                    <View style={styles.ImageHeaderBarContainerWithBack}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                navigation.goBack()
                            }}>
                            <ArrowBack/>
                        </TouchableOpacity>


                    </View>

                    {/* back handler */}

                </ImageBackground>
                {/* show background */}



                {/* more details */}

                {
                    item?.images?.map((image: any, index: number) => {

                        return (
                            <View style={{ marginVertical: 10 }} key={image}>
                                <Image

                                    source={{ uri: `${PUBLIC_STORAGE}/properties/${image}` }}
                                    style={{ width: '100%', height: 200, marginBottom: 20 }}
                                />

                            </View>

                        )
                    })
                }

                {/* more details */}

            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default PropertyImages

const styles = StyleSheet.create({
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ItemBackgroundImage: {
        width: '100%',
        aspectRatio: 25 / 15,
        justifyContent: 'space-between',
    },
})