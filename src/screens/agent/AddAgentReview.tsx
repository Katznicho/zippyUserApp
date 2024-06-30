import {  useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, FONTSIZE, SPACING } from "../../theme/theme";
import StarRating from 'react-native-star-rating-widget';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { generalStyles } from "../utils/generatStyles";
import { ActivityIndicator } from "../../components/ActivityIndicator";
import { COMMENT_ON_AGENT, COMMENT_ON_PROPERTY } from "../utils/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/dev";
import { showMessage } from "react-native-flash-message";
import { useNavigation, useRoute } from "@react-navigation/native";
import { showAuthScreen } from "../../redux/store/slices/UserSlice";


const AddAgentReview = () => {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [loading , setLoading] = useState<boolean>(false)


    const navigation = useNavigation<any>();

    const {agent_id} =  useRoute<any>().params;
    

    const { authToken , guestUser} = useSelector((state: RootState) => state.user);

    const [errors , setErrors] = useState<any>({
        comment : '',
        rating : ''
    });

    const dispatch = useDispatch<any>();

    const handleShowAlert = () => {
        Alert.alert(
            'Login',
            'You need to login first to continue',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => dispatch(showAuthScreen(true))
                }
            ],
            { cancelable: false }
        );
    };

    

    const handleSubmit = () => {
        try {
            if(guestUser){
                return handleShowAlert();
            }
            if(!comment){
                return setErrors((prevErrors: any) => ({ ...prevErrors, comment: 'Comment is required' }));
            }
            if(!rating){
               return  setErrors((prevErrors: any) => ({ ...prevErrors, rating: 'Rating is required' }));
            }
            setLoading(true);
            setErrors({ comment: '', rating: '' });
           

            fetch(`${COMMENT_ON_AGENT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                
                },
                body: JSON.stringify({
                    message: comment,
                    rating: rating.toString(),
                    agent_id
                  }),
            }).then(response => response.json())
                .then(data => {
                     console.log('Data:', data);
                    setLoading(false);
                    if (data.success) {
                        showMessage({
                            message: 'Comment added successfully',
                            type: 'success',
                        });
                        setRating(0);
                        setComment('');
                        return navigation.goBack()
                    } else {
                        return showMessage({
                            message: 'Failed to add comment',
                            type: 'danger',
                        });
                    }
                }).catch(error => {
                    setLoading(false);
                    return showMessage({
                        message: 'Failed to add comment',
                        type: 'danger',
                        description: error.message,
                    })

                });
        } catch (error) {
            console.log('Error:', error);
            setLoading(false);
                    return showMessage({
                        message: 'Failed to add comment',
                        type: 'danger',
                    })
        }

    };

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ paddingBottom: 50 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <Text style={styles.label}>Your Rating:</Text>
                <StarRating
                    rating={rating}
                    onChange={setRating}
                    style={{ marginBottom: 10 }}

                />
                   <View>
            {errors.rating && <Text style={generalStyles.errorText}>{errors.rating}</Text>}
          </View>

                <Text style={[styles.label, { marginTop: 20 }]}>Your Comment:</Text>
                <TextInput
                    style={styles.commentInput}
                    multiline
                    numberOfLines={4}
                    placeholder="Write your comment here..."
                    value={comment}
                    onChangeText={setComment}
                />
                    <View>
            {errors.comment && <Text style={generalStyles.errorText}>{errors.comment}</Text>}
          </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>Submit Review</Text>
                </TouchableOpacity>

                {loading && <ActivityIndicator />}

            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.space_20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: FONTSIZE.size_16,
        marginBottom: SPACING.space_10,
        color: COLORS.primaryDarkGreyHex,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: COLORS.primaryLightGreyHex,
        borderRadius: 8,
        padding: SPACING.space_10,
        fontSize: FONTSIZE.size_14,
        textAlignVertical: 'top', // Ensures multiline text starts from top
        marginBottom: SPACING.space_20,
    },
    submitButton: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: SPACING.space_15,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: FONTSIZE.size_16,
        fontWeight: 'bold',
    },
});

export default AddAgentReview;
