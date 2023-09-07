import { createSlice } from '@reduxjs/toolkit'

const statsSlice = createSlice({
  name: 'stats',
  initialState: 0,
  reducers: {
    addCypher: (state, action) => {
        state.push(action.payload)
    }
  },
});

export const { addCypher } = statsSlice.actions;
export default statsSlice.reducer;
