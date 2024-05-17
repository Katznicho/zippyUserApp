import React from 'react';
import { StyleSheet, Platform, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import ProfileStack from './ProfileStack';
import MyNotificationStack from './MyNotificationStack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';



const Tab = createBottomTabNavigator();



const TabNavigator = () => {

  const { isLoggedIn, user } = useSelector(
    (state: RootState) => state.user,
  );


  return (
    <Tab.Navigator
    screenOptions={{
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: COLORS.primaryBlackHex,
      tabBarInactiveTintColor: COLORS.primaryLightGreyHex,
      tabBarStyle: Platform.OS === "ios" ? [styles.tabBarStyleIos] : [styles.tabBarStyleAndroid],
      // tabBarLabelStyle: {
      //   fontSize: 12,
      //   paddingBottom: Platform.OS == "ios" ? 0 : 5,
      //   paddingVertical: Platform.OS == "ios" ? 0 : 0

      // }

    }
    }
    >

      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../assets/images/home.png')}
              style={{
                ...styles.imageStyles,
                tintColor: focused
                  ? COLORS.primaryBlackHex
                  : COLORS.secondaryGreyHex,
              }}
            />
          ),
        }}></Tab.Screen>


      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused, color, size }) => (
            
            <Image
              source={require('../assets/images/search.png')}
              style={{
                ...styles.imageStyles,
                tintColor: focused
                  ? COLORS.primaryBlackHex
                  : COLORS.secondaryGreyHex,
              }}
            />
          ),
        }}></Tab.Screen>


      {
        isLoggedIn && (
          <Tab.Screen
            name="Notification"
            component={MyNotificationStack}
            options={{
              title: 'Notifications',
              tabBarIcon: ({ focused, color, size }) => (
                <Image
              source={require('../assets/images/notifications.png')}
              style={{
                ...styles.imageStyles,
                tintColor: focused
                  ? COLORS.primaryBlackHex
                  : COLORS.secondaryGreyHex,
              }}
            />
              ),
            }}></Tab.Screen>
        )
      }

{
        isLoggedIn && (
          <Tab.Screen
            name="Likes"
            component={MyNotificationStack}
            options={{
              title: 'Like',
              tabBarIcon: ({ focused, color, size }) => (
                <Image
              source={require('../assets/images/like.png')}
              style={{
                ...styles.imageStyles,
                tintColor: focused
                  ? COLORS.primaryBlackHex
                  : COLORS.secondaryGreyHex,
              }}
            />
              ),
            }}></Tab.Screen>
        )
      }

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
            source={require('../assets/images/profile.png')}
            style={{
              ...styles.imageStyles,
              tintColor: focused
                ? COLORS.primaryBlackHex
                : COLORS.secondaryGreyHex,
            }}
          />
          ),
        }}></Tab.Screen>


    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyleAndroid: {
    height: 60,
    position: 'absolute',
    backgroundColor: COLORS.primaryOrangeHex,
    borderTopWidth: 0,
    elevation: 10,
    borderTopColor: 'transparent',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
  },
  tabBarStyleIos: {
    position: 'absolute',
    // backgroundColor: COLORS.primaryLightWhiteGrey,
    borderTopWidth: 0,
    // elevation: 10,
    borderTopColor: 'transparent',
    // marginHorizontal: 10,
    // marginVertical: 10,
    // borderRadius: 20,
    backgroundColor: COLORS.primaryOrangeHex,

  },
  imageStyles:{
    height:Platform.OS == "ios" ? "80%" : "60%",
    width: Platform.OS == "ios" ? "80%" : "60%",
    resizeMode: "contain",
  }
});
export default TabNavigator;
