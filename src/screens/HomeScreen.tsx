import React from 'react';
import { ScrollView } from 'react-native';
import { generalStyles } from './utils/generatStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Categories from '../components/Categories';
import PropertyDetailScrollView from '../components/PropertyDetailScrollView';
import CategoryTypes from '../components/CategoryTypes';
import ZippyAlertButton from '../components/ZippyAlertButton';
import { BOTTOM_NOTCH } from './utils/constants/constants';


const HomeScreen = () => {

  const tabBarHeight = useBottomTabBarHeight() + BOTTOM_NOTCH;

  return (
    <KeyboardAwareScrollView
      style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
      keyboardShouldPersistTaps="always"
    >

      {/* floating button */}
      <ZippyAlertButton />
      {/* floating button */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
      >
        {/* menu icon */}

        {/* menu icon */}


        {/* categories */}
        <Categories />
        {/* categories */}


        {/* near me*/}
        <CategoryTypes
          text="Near You"
          screen="AllProperties"
        />
        <PropertyDetailScrollView

        />
        {/* near me */}

        {/* recent */}
        <CategoryTypes
          text="Recent"
          screen="AllProperties"
        />
        <PropertyDetailScrollView />
        {/* recent */}

        {/* recent */}
        <CategoryTypes
          text="Popular"
          screen="AllProperties"
        />
        <PropertyDetailScrollView />
        {/* recent */}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};



export default HomeScreen;
