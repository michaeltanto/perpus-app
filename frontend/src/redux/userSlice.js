import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    NIM: 0,
    id: null,
    Username: "",
  },
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action) => {
      // action.payload = {}
      state.value.id = action.payload.id;
      state.value.Username = action.payload.Username;
      state.value.NIM = action.payload.NIM;
    },
    logout: (state) => {
      state.value.id = null;
      state.value.Username = "";
      state.value.NIM= ""

    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;