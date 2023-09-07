import { createSlice } from '@reduxjs/toolkit'

const statsSlice = createSlice({
  name: 'stats',
  initialState: 0,
  reducers: {
    addCypher: (state, action) => {
        state.value.push(action.payload)
    }
  },
});

export const { setKey } = statsSlice.actions;
export default statsSlice.reducer;