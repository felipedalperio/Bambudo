import {configureStore} from '@reduxjs/toolkit';
import colorSlice from './colorSlice';
import userReducer from './userSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        color: colorSlice,
    }
})