import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    location: {
        lat: 37.497625203,
        lng: 127.03088379,
        zoom: 3
    }
}

export const locationSlice = createSlice({
    name: 'locationSlice',
    initialState,
    reducers: {
        setLocation:(state,action) => {
            state.location = {
                ...state.location,
                lat:action.payload.lat,
                lng:action.payload.lng
            }
        }
    },
    

})

export const {setLocation } = locationSlice.actions
export default locationSlice.reducer