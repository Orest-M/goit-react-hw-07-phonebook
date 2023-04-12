import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    addFilter: {
      reducer(state, action) {
        state = action.payload;
        return state;
      },
      prepare(filter) {
        return {
          payload: filter,
        };
      },
    },
  },
});

export const { addFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
