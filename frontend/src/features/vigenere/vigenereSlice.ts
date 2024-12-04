import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface VigenereState {
    encodingMessage: string;
    decodingMessage: string;
    password: string;
}

const initialState: VigenereState = {
    encodingMessage: "",
    decodingMessage: "",
    password: "",
}

const vigenereSlice = createSlice({
    name: "vigenereSlice",
    initialState,
    reducers: {
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        setEncodingMessage(state, action: PayloadAction<string>) {
            state.encodingMessage = action.payload;
        },
        setDecodingMessage(state, action: PayloadAction<string>) {
            state.decodingMessage = action.payload;
        }
    }
})

export const {
    setPassword,
    setEncodingMessage,
    setDecodingMessage,
} = vigenereSlice.actions;

export const VigenereReducer = vigenereSlice.reducer;