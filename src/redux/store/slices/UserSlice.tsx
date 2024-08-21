import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isLoggedIn: boolean;
  guestUser: boolean
  user: User
  authToken: string,
  isSetupComplete: boolean
}

interface User {
  UID: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  role: string,
  displayPicture: string;
  points: string | number
  dob:string
}

const initialState: UserState = {
  isLoggedIn: false,
  guestUser: true,
  isSetupComplete: false,
  user: {
    UID: '',
    fname: '',
    lname: '',
    email: '',
    displayPicture: '',
    role: "",
    phone: "",
    points: 0,
    dob: ""
    // is_new_user: true,

  },
  authToken: '',

};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    updateUserState: (state, action: PayloadAction<UserState>) => {

      state.isLoggedIn = action.payload?.isLoggedIn;
      state.user = action.payload?.user;
      state.authToken = action.payload?.authToken;
    },

    logoutUser: state => {
      state.isLoggedIn = false;
      state.guestUser = true;
      state.authToken = '';
      state.user = {
        UID: '',
        fname: '',
        lname: '',
        email: '',
        displayPicture: '',
        role: "",
        phone: "",
        points: 0,
        dob: ""
      }
    },


    updateIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    updateSetupToTrue: (state) => {

      state.isSetupComplete = true
    },

    updateProfilePicture: (state, action: PayloadAction<string>) => {

      if (state && state.user) {
        state.user.displayPicture = action.payload;
      }
    },
    updateIsNewUser: (state, action: PayloadAction<boolean>) => {
      // state.user.is_new_user = false;
    },
    showAuthScreen: (state, action: PayloadAction<boolean>) => {
      state.guestUser = false;
      state.isLoggedIn = false
    },
    skipFirstLogin: (state) => {
      state.guestUser = false;
      state.isLoggedIn = false
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateUserState,
  logoutUser,
  updateProfilePicture,
  updateIsLoggedIn,
  showAuthScreen,
  skipFirstLogin,
  updateSetupToTrue
} = userSlice.actions;

export default userSlice.reducer;
