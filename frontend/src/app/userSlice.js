import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    storeToken: (state, action) => {
      state.token = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  loginFailure,
  loginSuccess,
  loginStart,
  storeToken,
  logout,
  subscription,
} = userSlice.actions;
export default userSlice.reducer;
