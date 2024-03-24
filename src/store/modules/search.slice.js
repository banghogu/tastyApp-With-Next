import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    searchText: null,
    searchDistrict: null,
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.searchText = action.payload
        },
        setDistrict: (state, action) => {
            state.searchDistrict = action.payload
        }
    },


})

export const { setSearch,setDistrict } = searchSlice.actions
export default searchSlice.reducer