import { createSlice } from '@reduxjs/toolkit';

const gridSlice = createSlice({
  name: 'grid',
  initialState: { Grid: false },
  reducers: {
    toggleGrid(state) {
      state.Grid = !state.Grid;
    },
  },
});

export const gridActions = gridSlice.actions;

export default gridSlice;
