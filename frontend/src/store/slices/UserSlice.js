import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name: "user",
        initialState: {
            username: "",
            token: ""
        },
        reducers: {
            login: (state,action) => {
                state.isAutheticated = action.payload.isAutheticated;
                state.token = action.payload.token;
            },
            clearUser: (state) => {
                state.username = "";
                state.token = "";
            }
        }
    });
export const {login,clearUser} = userSlice.actions;
export default userSlice.reducer;
