export const BASE_URL:string = "https://dashboard.zippyug.com/api/v1";


//app users
export const LOGIN_OR_REGISTER_WITH_EMAIL = `${BASE_URL}/app-user/loginOrRegisterByEmail`;
export const LOGIN_OR_REGISTER_WITH_PHONE = `${BASE_URL}/app-user/loginOrRegisterByPhone`;
export const VERIFY_EMAIL_OTP  = `${BASE_URL}/app-user/verifyEmailOtp`;
export const VERIFY_PHONE_OTP = `${BASE_URL}/app-user/verifyOtpPhoneNumber`;
export const RESEND_EMAIL_OTP = `${BASE_URL}/app-user/resendEmailOtpVerification`;
export const RESEND_PHONE_OTP = `${BASE_URL}/app-user/resendPhoneNumberOtp`;
export const SETUP_ACCOUNT = `${BASE_URL}/app-user/updateUserDetails`;
export  const LOGGED_IN_USER = `${BASE_URL}/app-user/fetchLoggedInUserDetails`;
export const LOGOUT = `${BASE_URL}/app-user/logout`;
export const LOGIN_OR_REGISTER_WITH_GOOGLE = `${BASE_URL}/app-user/loginOrRegisterByGoogle`;
//app users

export const LOGIN = `${BASE_URL}/auth/login`;
export const REGISTER = `${BASE_URL}/auth/registerCommunity`;

// export const FORGOT_PASSWORD = `${BASE_URL}/auth/requestPasswordReset`;
// export const RESET_PASSWORD = `${BASE_URL}/auth/resetPassword`;
// export const RESEND_OTP = `${BASE_URL}/auth/resendOTP`
// export const VERIFY_EMAIL = `${BASE_URL}/auth/verifyEmail`
// export const SAVE_DEVICE_INFO = `${BASE_URL}/auth/saveDeviceInfo`
// export const SETUP_WALLET_ACCOUNT = `${BASE_URL}/auth/setUpUserWalletAccount`;
// export const UPDATEWALLETBALANCE = `${BASE_URL}/auth/updateShowWalletBalance`
// export const UPDATEUSERAVATAR = `${BASE_URL}/auth/updateUserAvatarUrl`
// export const UPDATE_USER_LOCATION = `${BASE_URL}/auth/updateUserLocation`;


//payments
export const LOAD_POINTS = `${BASE_URL}/app-user/loadPoints`;
export const PROCESSORDER = `${BASE_URL}/app-user/processOrder`;
export const USERPAYMENTS = `${BASE_URL}/app-user/getUserPayments`;
export const USERPRODUCTS = `${BASE_URL}/app-user/getUserProducts`;
export const USERBOOKINGS =  `${BASE_URL}/app-user/getUserBookings`;

export const USERDELIVERIES = `${BASE_URL}/app-user/getUserDelivries`
export const USERNOTIFICATIONS = `${BASE_URL}/app-user/getUserNotifications`

//booking
export const CREATE_BOOKING = `${BASE_URL}/app-user/createUserBooking`;

//uploads
export const PROFILE_UPLOAD = `${BASE_URL}/profileUpload`;
export const IMAGES_UPLOAD = `${BASE_URL}/uploadIdImages`


//property owner
export const REGISTER_PROPERTY_OWNER = `${BASE_URL}/registerPropertyOwner`;
export const REGISTER_PROPERTY = `${BASE_URL}/registerPropertyByAgent`;
export const GET_ALL_REGISTERED_PROPERTY_OWNERS = `${BASE_URL}/getAllRegisteredPropertyOwners`;

export const GET_REGISTERED_USERS_BY_PAGE = `${BASE_URL}/getRegisterPropertyOwnersByPage`;
export const VERIFY_PROPERTY_OWNER = `${BASE_URL}/verifyPropertyOwnerPhoneNumber`

//properties
export const GET_ALL_PROPERTIES_BY_PAGINATION = `${BASE_URL}/getAllPropertiesByPagination`;
//https://zippy.risidev.com/api/v1/getAllPropertiesByPagination

//property owner
export const GET_REGISTERED_OWNER_PROPERTY_BY_PAGE = `${BASE_URL}/getRegisterPropertyOfOwnerByPage`;

//zippy alert
export const CREATE_ZIPPY_ALERT = `${BASE_URL}/app-user/createPropertyAlert`
//https://zippy.risidev.com/api/v1/createPropertyAlert
export const GET_ALL_ZIPPY_ALERTS = `${BASE_URL}/app-user/getUserAlerts`
export const ACTIVATE_ZIPPY_ALERT = `${BASE_URL}/app-user/ActivateAlert`
export const DEACTIVATE_ZIPPY_ALERT = `${BASE_URL}/app-user/deActivateAlert`;

export const COMMENT_ON_PROPERTY = `${BASE_URL}/app-user/commentOnProperty`;
export const COMMENT_ON_AGENT = `${BASE_URL}/app-user/commentOnAgentProperty`;
export const COMMENTS_BY_ID  = `${BASE_URL}/getPropertyCommentsByIdAndPaginated`
export const AGENT_COMMENTS_BY_ID = `${BASE_URL}/getPropertyAgentCommentsByIdAndPaginated`

export const LIKE_PROPERTY = `${BASE_URL}/app-user/likeProperty`
export const DISLIKE_PROPERTY = `${BASE_URL}/app-user/dislikeProperty`;
export const GET_APP_USER_LIKES = `${BASE_URL}/app-user/getUserLikes`;

export const CHECK_IF_PROPERTY_LIKED  = `${BASE_URL}/app-user/checkIfPropertyLikedByUser`;






//general
export const GET_ALL_CATEGORIES = `${BASE_URL}/getAllCategories`;
export const GET_ALL_SERVICES = `${BASE_URL}/getAllServices`;
export const GET_ALL_AMENTITIES = `${BASE_URL}/getAllAmenities`;
export const  GET_ALL_PROPERTY_STATUSES = `${BASE_URL}/getAllPropertyStatuses`
export const GET_ALL_CURRENCIES = `${BASE_URL}/getAllCurrencies`
export const GET_ALL_PAYMENT_PERIODS = `${BASE_URL}/getAllPaymentPeriods`


