//model2.js
import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: [],
  reducers: {
    addQuestion: (state, action) => {
    state.value.push(action.payload)
    }
     },
});

export const { addQuestion} = historySlice.actions;
export default historySlice.reducer;