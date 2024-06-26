import { Platform, StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";

export const generalStyles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryLightWhiteGrey,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.roboto_bold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryWhiteHex,
    alignItems: 'center',
  },
  flexStyles: {
    display: 'flex',
    flexDirection: 'row',
  },
  absoluteStyles: {
    position: 'absolute',
    zIndex: 20,
  },
  resideViews: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    margin: 2,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomHairline: {
    borderBottomColor: COLORS.primaryOrangeHex,
    borderBottomWidth: 3,
    marginRight: 10,
    marginLeft: 20,
    width: 100,
  },
  authTitle: {
    fontSize: 20,
    fontFamily: FONTFAMILY.roboto_regular,
    color: COLORS.primaryOrangeHex,
    marginTop: 25,
    marginBottom: 8,
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 30,
  },
  textStyle: {
    fontFamily: FONTFAMILY.roboto_light,
    color: COLORS.primaryWhiteHex,
    fontSize: 15,
  },
  errorText: {
    color: COLORS.primaryRedHex,
    fontSize: 14,
  },
  InputContainer: {
    height: 42,
    borderWidth: 1,
    borderColor: COLORS.primaryLightGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryDarkGreyHex,
    paddingLeft: 10,
    color: COLORS.primaryWhiteHex,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 10,
    alignItems: 'center',
    elevation: 5,

    textAlign: "center"
  },
  loginContainer: {
    width: '70%',
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 25,
    padding: 10,
    marginTop: 30,
    alignSelf: 'center',
    alignItems: 'center',

  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginHorizontal: 20
  },
  forgotText: {
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.roboto_light,
  },
  loginText: {
    color: COLORS.primaryBlackHex,
    fontFamily: FONTFAMILY.roboto_light,
    // fontFamily: FONTFAMILY.poppins_medium,
  },
  viewStyles: {
    marginHorizontal: 20,
    marginVertical: 10
  },
  phoneInputContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  phoneTextInputContainer: {
    paddingVertical: 0,
    backgroundColor: '#f5f5f5',
  },


  titleHeaderStyles: {
    fontSize: 25,
    fontFamily: FONTFAMILY.roboto_bold,
  },
  formInputTextStyle: {
    fontSize: 20,
    fontFamily: FONTFAMILY.roboto_bold,
    color: COLORS.primaryWhiteHex
  },
  headerStyle: {
    backgroundColor: COLORS.primaryOrangeHex
  },
  scrollViewContentPadding: {
    paddingBottom: 100
  },
  progress: { marginTop: 10, alignSelf: 'center' },
  CardTitle: {
    fontFamily: FONTFAMILY.roboto_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.roboto_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
    // marginHorizontal: SPACING.space_10
  },
  CardPriceCurrency: {
    fontFamily: FONTFAMILY.roboto_bold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_12,
  },
  container: {
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: 10,
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    margin: 5,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  borderStyles: {
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    height: 45,
    borderColor: COLORS.primaryLightGreyHex,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  formInput: {
    color: COLORS.primaryWhiteHex,
    fontSize: 15,
    fontFamily: FONTFAMILY.roboto_regular,
    paddingHorizontal: 0,
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
    marginTop: 5,
    width: "100%",
    // marginHorizontal:10
  },
  formContainer: {
    marginVertical: Platform.OS === 'android' ? 5 : 10,
    marginHorizontal: 10
  },
  errorInput: {
    borderColor: COLORS.primaryRedHex,
    fontFamily: FONTFAMILY.roboto_regular
  },

});