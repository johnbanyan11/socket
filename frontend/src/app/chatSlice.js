import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
  notification: [],
  chats: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.loading = false;
      state.selectedChat = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { setChats, setSelectedChat, setNotification } = chatSlice.actions;

export default chatSlice.reducer;
