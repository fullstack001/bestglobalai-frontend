import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const goSubscription = createSlice({
  name: "goSubscription",
  initialState,
  reducers: {
    setplan: (state, action) => {
      // Properly setting the state from the action payload
      return action.payload;
    },
    clearPlan: () => null,
  },
});

export const { setplan, clearPlan } = goSubscription.actions;
export default goSubscription.reducer;
