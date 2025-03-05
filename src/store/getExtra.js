import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const extra = createSlice({
  name: "extra",
  initialState,
  reducers: {
    setExtra: (state, action) => {
      // Properly setting the state from the action payload
      return action.payload;
    },
    clearExtra: () => null,
  },
});

export const { setExtra, clearExtra } = extra.actions;
export default extra.reducer;
