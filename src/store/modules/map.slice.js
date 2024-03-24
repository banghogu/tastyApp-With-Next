import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    map: {}
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMap: (state, action) => {
            state.map = action.payload
        }
    },
    

})

export const { setMap } = mapSlice.actions
export default mapSlice.reducer