import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  postModal: false,
  postId: null,
  postData: {
    postImage: null,
    username: null,
    comments: [],
    caption: null,
    photoUrl: null
  },
};

const commentModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openCommentModal: (state) => {
      state.isOpen = true;
    },
    closeCommentModal: (state) => {
      (state.isOpen = false), (state.postData = {});
    },
    setPost: (state, action) => {
      state.postData.postImage = action.payload.postImage,
      state.postData.username = action.payload.username,
      state.postData.comments = action.payload.comments,
      state.postData.caption = action.payload.caption,
      state.postData.id = action.payload.id
      state.postData.photoUrl = action.payload.photoUrl

    },
    openPostModal: (state) => {
      state.postModal = true;
    },
    closePostModal: (state) => {
      state.postModal = false
    }
  },
});

export const { openCommentModal, closeCommentModal, setPost, openPostModal, closePostModal } =
  commentModalSlice.actions;

export default commentModalSlice.reducer;
