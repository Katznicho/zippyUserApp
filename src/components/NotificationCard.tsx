/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import moment from 'moment';
import useGetUserLocation from '../hooks/useGetUserLocation';
import { useNavigation } from '@react-navigation/native';

const NotificationCard = ({ item }: any) => {
  const { position } = useGetUserLocation();
  const navigation = useNavigation<any>();

  const markAsRead = () => {
    //console.log('Marked as read');
    // Implement the logic to mark the notification as read
  };

  const deleteNotification = () => {
   // console.log('Deleted');
    // Implement the logic to delete the notification
  };

  const viewDetails = () => {
    //console.log('View details');
    // Implement the logic to view details of the notification
  };

  return (
    <View style={styles.containerStyles}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() =>
          item?.type === 'Property Notification'
            ? navigation.navigate('PropertyStack', {
                screen: 'PropertyDetails',
                params: { data: item?.property, position: position },
              })
            : console.log('Notification pressed')
        }
        activeOpacity={1}
      >
        {item.type === 'Property Notification' && item.property?.cover_image && (
          <Image source={{ uri: item.property.cover_image }} style={styles.image} />
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.textColor, { fontWeight: 'bold' }]}>{item?.title}</Text>
          <Text style={[generalStyles.textStyle]}>{item?.message}</Text>
          <Text style={[styles.textColor, styles.timeText]}>{moment(item?.time).format('Do, MMM YYYY')}</Text>
        </View>
      </TouchableOpacity>
      
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  containerStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: COLORS.primaryBlackHex,
    paddingVertical: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  textColor: {
    color: COLORS.primaryWhiteHex,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonContainer: {
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    // alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.primaryRedHex,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  buttonText: {
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
  },
  timeText: {
    marginTop: 5,
    fontSize: 12,
    opacity: 0.8,
  },
});
