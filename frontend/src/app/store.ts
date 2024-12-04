import {configureStore} from "@reduxjs/toolkit";
import {VigenereReducer} from "../features/vigenere/vigenereSlice.ts";


export const store = configureStore({
    reducer: {
        vigenere: VigenereReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;