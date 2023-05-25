import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'color',
    initialState: {
        color: {
            primaryColor: '#5CC6BA',
            primaryColorLight: '#B8E2DE',
            primaryColorDark: '#4ABAAD',
            primaryColorDark2: '#3AA79B',
            textColor:'#515151',
            textColorDark:'#444'
        }
    },
    reducers: {
        changecolor(state, {payload}){
            return {...state, color: payload}
        }
    }
})

export const {changecolor} = slice.actions;
export const selectcolor = state => state.color.color;
export default slice.reducer