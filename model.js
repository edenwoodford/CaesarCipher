//model.js
import { createSlice } from '@reduxjs/toolkit'

const statsSlice = createSlice({
  name: 'stats',
  initialState: 0,
  reducers: {
//add cypher, get cupher, remove cypher
  },
});

export const { setKey } = statsSlice.actions;
export default statsSlice.reducer;