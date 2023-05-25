import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'user',
    initialState: {
        user:{
            id: '',
            email: '',
            name: '',
            picture: '',
            postsLiked: [],
        }
    },
    reducers: {
        changeUser(state, {payload}){
            return {...state, user: payload}
        }
    }
})

export const {changeUser} = slice.actions;
export const selectUser = state => state.user.user;
export const userId = state => state.user.user.id;
export default slice.reducer