import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  fname: "",
  lname: "",
  role: "",
  error: null,
};

const userSlice = createSlice({
  name: "userslice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.fname = action.payload.fname;
      state.lname = action.payload.lname;
      state.role = action.payload.role;
    },
    login: (state) => {},
    logoutUser: (state) => {
      state.user = null; // Logout by clearing the user
    },
    setError: (state, action) => {
      state.error = action.payload; // Set error message
    },
  },
});

export const { logoutUser, setUser, setError } = userSlice.actions;
export default userSlice.reducer;
