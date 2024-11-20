import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
  coverImage: null,
};

const ebookSlice = createSlice({
  name: "ebook",
  initialState,
  reducers: {
    setEbookTitle: (state, action) => {
      state.title = action.payload;
    },
    setEbookAuthor: (state, action) => {
      state.author = action.payload;
    },
    setCoverImage: (state, action) => {
      // Add coverImage reducer
      state.coverImage = action.payload;
    },
  },
});

export const { setEbookTitle, setEbookAuthor, setCoverImage } = ebookSlice.actions;
export default ebookSlice.reducer;
