import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: null,
    username: null,
    uid: null,
    photoUrl: null

}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.name = action.payload.name,
        state.username = action.payload.username,
        state.uid = action.payload.uid,
        state.photoUrl = action.payload.photoUrl

    },
    signOutUser : (state) => {
        state.name = null,
        state.username = null,
        state.uid = null,
        state.photoUrl = null
    }
  }
});

export const {setUser, signOutUser} = userSlice.actions

export default userSlice.reducer