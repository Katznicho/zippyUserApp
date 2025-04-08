import { Alert, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { RootState } from "../redux/store/dev";
import { useDispatch, useSelector } from "react-redux";
import { showAuthScreen } from "../redux/store/slices/UserSlice";
import { useNavigation } from "@react-navigation/native";

const MoversBanner = () => {
    const { guestUser, authToken } = useSelector((state: RootState) => state?.user);
    const navigation = useNavigation<any>()

    const dispatch = useDispatch<any>()

    const handleShowAlert = () => {
        Alert.alert(
            'Login',
            "You need to login first to see this screen",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => dispatch(showAuthScreen(true)),
                },
            ],
            { cancelable: false },
        )
    }
    
  return (
    <TouchableOpacity
     style={styles.bannerContainer} 
    activeOpacity={1}
    onPress={() => guestUser ? handleShowAlert() : navigation.navigate('MoveRequest')}
    >
      <Image
        source={require('../assets/app_images/movers.png')} 
        style={styles.bannerImage}
        resizeMode="cover"
      />
      <Text style={styles.bannerText}>Introducing Movers! Simplify Your Moving Experience Today.</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  bannerText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
});

export default MoversBanner;