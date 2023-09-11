import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: [],
  reducers: {
    addHistory: (state, action) => {
    state.push(action.payload)
    },
    deleteHistory: (state, action) => {
      const { message } = action.payload; 
      const messageIndex = state.findIndex((item) =>
        item.originalMessage === message.originalMessage &&
        item.encryptionKey === message.encryptionKey &&
        item.result === message.result
      );
      if (messageIndex !== -1) {
        state.splice(messageIndex, 1);
      }
    },
    },
});

export const { addHistory, deleteHistory} = historySlice.actions;
export default historySlice.reducer;