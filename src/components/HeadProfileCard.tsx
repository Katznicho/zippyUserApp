import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/dev';
import UploadComponent from './UploadComponent';
import { updateProfilePicture } from '../redux/store/slices/UserSlice';
import { DEFAULT_USER_PROFILE, PUBLIC_STORAGE } from '../screens/utils/constants/constants';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS } from '../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PROFILE_UPLOAD } from '../screens/utils/constants/routes';
import RNFetchBlob from 'rn-fetch-blob';
import { ActivityIndicator } from './ActivityIndicator';

const screenWidth = Dimensions.get('window').width

const HeadProfileCard = () => {


    const { user, isLoggedIn, authToken } = useSelector((state: RootState) => state.user);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [imagePath, setImagePath] = useState<any>(null);
    const [progress, setProgress] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(false);



    const dispatch = useDispatch<AppDispatch>();

    const handleUpload = async () => {
        try {
            setLoading(true)
            const coverImageFilePath = imagePath?.imagePath?.replace(/^file:\/\//, '');

            const formData = new FormData();

            formData.append('profile_pic', {
                name: 'profile_pic',
                filename: 'profile_pic.png',
                type: 'image/png',
                data: RNFetchBlob.wrap(coverImageFilePath),
            });

            RNFetchBlob.fetch(
                'POST',
                PROFILE_UPLOAD,
                {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                [
                    {
                        name: 'profile_pic',
                        filename: 'profile_pic.png',
                        type: 'image/png',
                        // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
                        // Or simply wrap the file path with RNFetchBlob.wrap().
                        data: RNFetchBlob.wrap(coverImageFilePath)
                    },

                ]
            ).uploadProgress((written, total) => {
                setProgress(written / total)
            })
                .then(response => response.json())
                .then(async (res) => {
                    setImagePath(null)

                    setLoading(false)
                    //dispatch(updateProfilePicture(res.data));
                    const { profile_pic } = res.data;
                    dispatch(updateProfilePicture(profile_pic));
                    return showMessage({
                        message: 'Profile picture updated successfully',
                        type: 'success',
                        icon: 'success',
                        duration: 3000,
                        floating: true,
                    })
                }).
                catch((error) => {
                    setLoading(false)
                    showMessage({
                        message: error.response.data.message,
                        description: error.response.data.error,
                        type: 'danger',
                        icon: 'danger',
                        duration: 3000,
                        floating: true,
                    });
                });


        } catch (error: any) {
            setLoading(false)
            showMessage({
                message: error.response.data.message,
                description: error.response.data.error,
                type: 'danger',
                icon: 'danger',
                duration: 3000,
                floating: true,
            });
        }
    };

    useEffect(() => {

    }, [imagePath]);

    const getImageUrl = (displayPicture: string | null) => {


        if (displayPicture) {
            return `${PUBLIC_STORAGE}profile/${displayPicture}`
        } else {
            return DEFAULT_USER_PROFILE
        }

    }



    return (
        <View style={[generalStyles.flexStyles]}>
            <TouchableOpacity
                style={[{ marginHorizontal: 20, marginVertical: 10 }]}
                onPress={() => {
                    if (isLoggedIn) {
                        setShowModal(!showModal);
                    }
                }}
            >
                {imagePath ? (
                    <View>
                        <Image
                            style={{ width: 80, height: 80, borderRadius: 40 }}
                            source={{
                                uri: `${imagePath.imagePath}`,
                            }}
                        />
                        <View
                            style={[generalStyles.absoluteStyles, { bottom: -6, right: -15 }]}
                        >


                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLORS.primaryOrangeHex,
                                    width: 40,
                                    height: 40,
                                    borderRadius: 35,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={handleUpload}>
                                <AntDesign
                                    name="upload"
                                    color={COLORS.primaryWhiteHex}
                                    size={25}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                ) : (
                    <Image
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                        source={{ uri: getImageUrl(user?.displayPicture) }}
                    />
                )}
            </TouchableOpacity>



            {/* progress bar */}

            {/* loader */}
            {loading && <ActivityIndicator />}
            {/* loader */}

            {/* modal section */}
            {showModal && (
                <UploadComponent
                    image={imagePath}
                    setImage={setImagePath}
                    setModal={setShowModal}
                    showModal={showModal}
                    selectDocument={false}
                />
            )}

            {/* modal section */}
        </View>
    );
};

export default HeadProfileCard;


