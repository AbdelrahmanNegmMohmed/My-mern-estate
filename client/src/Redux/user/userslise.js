import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    ubdateuserStart: (state) => {
      state.loading = true;
    },
    ubdateuserSuccess: (state, action) => {
      state.currentUser = action.payload; //null
      state.loading = false;
      state.error = null;
    },
    updateuserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteuserStart: (state) => {
      state.loading = true;
    },
    deleteuserSuccess: (state, action) => {
      state.currentUser = null; 
      state.loading = false;
      state.error = null;
    },
    deleteuserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    sidnoutuserStart: (state) => {
      state.loading = true;
    },
    sidnoutuserSuccess: (state, action) => {
      state.currentUser = null; 
      state.loading = false
      state.error = null;
    },
    sidnoutuserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  ubdateuserStart,
  ubdateuserSuccess,
  updateuserFailure,
  deleteuserStart,
  deleteuserSuccess,
  deleteuserFailure,
  sidnoutuserStart,
sidnoutuserSuccess,
sidnoutuserFailure,
} = userSlice.actions;

export default userSlice.reducer;
