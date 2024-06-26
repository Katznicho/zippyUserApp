import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/theme';
import { showMessage } from 'react-native-flash-message';

const CommitmentPage = () => {
  const navigation = useNavigation<any>();

  const onAgree = () => {
    // Logic for agreeing to the commitment
    showMessage({
      message: 'You have agreed to the commitment. You can continue using the app.',
      description: 'Thank you for your commitment!',
      type: 'success',
      duration: 3000,
      icon: 'success',
    })
    return navigation.navigate('NotificationConfirmation'); // Navigate to the next screen
  };

  const onDecline = () => {
    // Logic for declining the commitment
    // navigation.goBack(); // Navigate back to the previous screen
    Alert.alert('Declined', 'You have declined the commitment. You can still continue using the app.');
    return navigation.navigate('NotificationConfirmation');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../assets/app_images/handshake.png')} // Ensure you have the appropriate image
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Our community commitment</Text>
      <Text style={styles.subtitle}>
        Zippy Real Estates is a community where anyone can belong
      </Text>
      <Text style={styles.description}>
        To ensure this, we’re asking you to commit to the following:
      </Text>
      <Text style={styles.commitmentText}>
        I agree to treat everyone in the Zippy Real Estates community – regardless of their race, religion, national origin, ethnicity, skin colour, disability, sex, gender identity, sexual orientation or age – with respect, and without judgement or bias.
      </Text>

      <TouchableOpacity
        style={styles.learnMoreButton}
        onPress={() =>Linking.openURL('https://zippyug.com/')}
      >
        <Text style={styles.learnMoreText}>Learn more</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.agreeButton}
        onPress={onAgree}
      >
        <Text style={styles.agreeButtonText}>Agree and continue</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.declineButton}
        onPress={onDecline}
      >
        <Text style={styles.declineButtonText}>Decline</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color:"black"
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color:"black"
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color:"black"
  },
  commitmentText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
    color:"black"
  },
  learnMoreButton: {
    marginBottom: 20,
  },
  learnMoreText: {
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
  agreeButton: {
    backgroundColor: '#ff5a5f',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%',
  },
  agreeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  declineButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
  },
  declineButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default CommitmentPage;
