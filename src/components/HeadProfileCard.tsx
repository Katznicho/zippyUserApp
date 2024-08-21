import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/dev';
import UploadComponent from './UploadComponent';
import { updateProfilePicture } from '../redux/store/slices/UserSlice';
import { DEFAULT_USER_PROFILE, PUBLIC_STORAGE } from '../screens/utils/constants/constants';
import { generalStyles } from '../screens/utils/generatStyles';
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

    const handleUpload = async (selectedImagePath: string) => {
        try {
            setLoading(true)
            const coverImageFilePath = selectedImagePath.replace(/^file:\/\//, '');


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
                    const { profile_pic } = res.data;
                    
                    dispatch(updateProfilePicture(profile_pic));
                    showMessage({
                        message: 'Profile picture updated successfully',
                        type: 'success',
                        icon: 'success',
                        duration: 3000,
                        floating: true,
                    });
                })
                .catch((error) => {
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
        if (imagePath) {
            handleUpload(imagePath.imagePath);
        }
    }, [imagePath]);

    const getImageUrl = (displayPicture: string | null) => {
        return displayPicture ? `${PUBLIC_STORAGE}profile/${displayPicture}` : DEFAULT_USER_PROFILE;
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
                <Image
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                    source={{ uri: imagePath ? imagePath.imagePath : getImageUrl(user?.displayPicture) }}
                />
            </TouchableOpacity>

            {loading && <ActivityIndicator />}

            {showModal && (
                <UploadComponent
                    image={imagePath}
                    setImage={setImagePath}
                    setModal={setShowModal}
                    showModal={showModal}
                    selectDocument={false}
                />
            )}
        </View>
    );
};

export default HeadProfileCard;
