import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentStore: {}
}

export const currentStoreSlice = createSlice({
    name: 'currentStore',
    initialState,
    reducers: {
        setCurrentStore: (state,action) => {
            state.currentStore = action.payload
        },
        clearCurrentStore: (state) => {
            state.currentStore = {}
        }
    },

})

export const { setCurrentStore,clearCurrentStore } = currentStoreSlice.actions
export default currentStoreSlice.reducer