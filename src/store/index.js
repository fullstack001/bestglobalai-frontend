import { configureStore } from "@reduxjs/toolkit";
import ebookReducer from "./ebookSlice";
import openPanelReducer from "./openPanelSlice";
import goSubscriptionReducer from "./goSubscription";
import userReducer from "./userSlice";
import extraReducer from "./getExtra";

export const store = configureStore({
  reducer: {
    ebook: ebookReducer,
    openPanel: openPanelReducer,
    goSubscription: goSubscriptionReducer,
    user: userReducer,
    extra: extraReducer,
  },
});

export default store;
