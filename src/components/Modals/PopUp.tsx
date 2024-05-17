import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import { Dialog, PanningProvider } from 'react-native-ui-lib';
import { COLORS } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { generalStyles } from '../../screens/utils/generatStyles';

const PopUp = () => {
    const navigation = useNavigation<any>();
    return (
        <View>
            <Dialog
                visible={true}
                // onDismiss={() => setIsVisible(false)}
                panDirection={PanningProvider.Directions.DOWN}
                // centered={true}
                containerStyle={{
                    backgroundColor: COLORS.primaryBlackHex,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10
                }}
                height={250}>
                <View style={{ margin: 10 }}>
                    <TouchableOpacity
                        activeOpacity={1}

                    >
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>
                                Provide Community Details ?
                            </Text>
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <Text style={[generalStyles.textStyle]}>
                                This will be used to identify your community and create a cutsomized plan for you
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={[generalStyles.loginContainer, { marginTop: 5 }]}
                        onPress={() => navigation.navigate("CommunityDetails")}>
                        <Text style={generalStyles.loginText}>{'Add Details'}</Text>
                    </TouchableOpacity>

                </View>




            </Dialog>
        </View>
    )
}

export default PopUp

const styles = StyleSheet.create({})