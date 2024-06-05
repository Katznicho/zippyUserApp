import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isLoggedIn: boolean;
  guestUser: boolean
  user: User
  authToken: string,
}

interface User {
  UID: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  role: string,
  // is_new_user: boolean,
  displayPicture: string;
  pooints: string | number
  // guestUser: boolean
}

const initialState: UserState = {
  isLoggedIn: false,
  guestUser: true,
  user: {
    UID: '',
    fname: '',
    lname: '',
    email: '',
    displayPicture: '',
    role: "",
    phone: "",
    pooints: 0
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
      state.user = {
        UID: '',
        fname: '',
        lname: '',
        email: '',
        displayPicture: '',
        role: "",
        phone: "",
        pooints: 0
      }
    },


    updateIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
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
      state.guestUser = true;
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
  skipFirstLogin
} = userSlice.actions;

export default userSlice.reducer;
