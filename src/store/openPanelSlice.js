// openPanelSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = null; // Sidebar is initially closed

const openPanelSlice = createSlice({
  name: 'openPanel',
  initialState,
  reducers: {
    openPanel: (state, action) => action.payload, // Set the panel to 'video' or 'social'
    closePanel: () => null, // Close the panel
  },
});

export const { openPanel, closePanel } = openPanelSlice.actions;
export default openPanelSlice.reducer;
