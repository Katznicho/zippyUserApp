import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Base from './src/screens/Base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { persistor, store } from './src/redux/store/dev';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StatusBar, StyleSheet } from 'react-native';
import { COLORS } from './src/theme/theme';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './src/screens/NoInternet';
import notifee from '@notifee/react-native';
import InAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';

const App = () => {
  const [connected, setIsConnected] = useState<boolean | null>(false);

  const checkInternet = () => {
    NetInfo.addEventListener((state: { isConnected: boolean | ((prevState: boolean | null) => boolean | null) | null; }) => {
      return setIsConnected(state?.isConnected);
    });
  };

  const checkForUpdates = () => {
    const inAppUpdates = new InAppUpdates(false);

    inAppUpdates.checkNeedsUpdate().then(result => {
      if (result.shouldUpdate) {
        inAppUpdates.startUpdate({
          updateType: IAUUpdateKind.FLEXIBLE,
        });
      }
    });
  };

  useEffect(() => {
    checkInternet();
  }, [connected]);

  useEffect(() => {
    SplashScreen.hide();
    requestForNotifications();
    checkForUpdates();
  }, []);

  const requestForNotifications = async () => {
    await notifee.requestPermission();
  };

  return connected ? (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={new QueryClient()}>
            <StatusBar backgroundColor={COLORS.primaryOrangeHex} />
            <Base />
          </QueryClientProvider>
          <FlashMessage position="top" animated />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  ) : (
    <NoInternet checkInternet={checkInternet} />
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
