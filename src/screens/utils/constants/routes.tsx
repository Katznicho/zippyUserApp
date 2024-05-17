export const BASE_URL = "https://dashboard.zippyug.com/api/v1";

export const LOGIN = `${BASE_URL}/auth/login`;
export const REGISTER = `${BASE_URL}/auth/registerCommunity`;
export const LOGOUT = `${BASE_URL}/auth/logout`;
export const FORGOT_PASSWORD = `${BASE_URL}/auth/requestPasswordReset`;
export const RESET_PASSWORD = `${BASE_URL}/auth/resetPassword`;
export const RESEND_OTP = `${BASE_URL}/auth/resendOTP`
export const VERIFY_EMAIL = `${BASE_URL}/auth/verifyEmail`
export const SAVE_DEVICE_INFO = `${BASE_URL}/auth/saveDeviceInfo`
export const SETUP_WALLET_ACCOUNT = `${BASE_URL}/auth/setUpUserWalletAccount`;
export const UPDATEWALLETBALANCE = `${BASE_URL}/auth/updateShowWalletBalance`
export const UPDATEUSERAVATAR = `${BASE_URL}/auth/updateUserAvatarUrl`
export const UPDATE_USER_LOCATION = `${BASE_URL}/auth/updateUserLocation`;
export const UPDATE_PASSWORD_FIRST_USER = `${BASE_URL}/auth/resetPasswordFirstUser`;

//payments
export const PROCESSORDER = `${BASE_URL}/processOrder`;
export const USERPAYMENTS = `${BASE_URL}/getUserPayments`;
export const USERPRODUCTS = `${BASE_URL}/getUserProducts`;
export const USERBOOKINGS =  `${BASE_URL}/getUserBookings`;

export const USERDELIVERIES = `${BASE_URL}/getUserDelivries`
export const USERNOTIFICATIONS = `${BASE_URL}/getUserNotifications`

//booking
export const CREATE_BOOKING = `${BASE_URL}/createUserBooking`;

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
export const CREATE_ZIPPY_ALERT = `${BASE_URL}/createPropertyAlert`
//https://zippy.risidev.com/api/v1/createPropertyAlert
export const GET_ALL_ZIPPY_ALERTS = `${BASE_URL}/getUserAlerts`
export const ACTIVATE_ZIPPY_ALERT = `${BASE_URL}/ActivateAlert`
export const DEACTIVATE_ZIPPY_ALERT = `${BASE_URL}/deActivateAlert`






//general
export const GET_ALL_CATEGORIES = `${BASE_URL}/getAllCategories`;
export const GET_ALL_SERVICES = `${BASE_URL}/getAllServices`;
export const GET_ALL_AMENTITIES = `${BASE_URL}/getAllAmenities`;
export const  GET_ALL_PROPERTY_STATUSES = `${BASE_URL}/getAllPropertyStatuses`
export const GET_ALL_CURRENCIES = `${BASE_URL}/getAllCurrencies`
export const GET_ALL_PAYMENT_PERIODS = `${BASE_URL}/getAllPaymentPeriods`


