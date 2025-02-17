import { configureStore } from "@reduxjs/toolkit";
import ebookReducer from "./ebookSlice";
import openPanelReducer from "./openPanelSlice";
import goSubscriptionReducer from "./goSubscription";

export const store = configureStore({
  reducer: {
    ebook: ebookReducer,
    openPanel: openPanelReducer,
    goSubscription: goSubscriptionReducer,
  },
});

export default store;
