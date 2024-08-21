/* eslint-disable prettier/prettier */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

// Function to display notification using Notifee
async function displayNotification(message) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    vibration: true,
    //give  high priority to the notification
    importance:AndroidImportance.HIGH,
    sound: 'default',
    soundURI: 'default',
    lightColor: '#FF0000',
  });

  await notifee.displayNotification({
    title: message.notification?.title || 'Default Title',
    body: message.notification?.body || 'Default Body',
    android: {
      channelId: 'default',
      smallIcon: 'launch_screen', // Ensure this icon exists
      color: message.notification?.android?.color || '#f45342',
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      categoryId:
        message.apns?.payload?.aps?.category || 'NEW_MESSAGE_CATEGORY',
      attachments: [
        {
          url:
            message.apns?.fcmOptions?.image ||
            'https://stabexinternational.com/wp-content/uploads/2021/12/logo.png',
        },
      ],
    },
  });

}

// Foreground notification handler
async function onMessageReceived(message) {
  await displayNotification(message);
}

// Background notification handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  await displayNotification(remoteMessage);
});

// Register message handlers
messaging().onMessage(onMessageReceived);

AppRegistry.registerComponent(appName, () => App);
