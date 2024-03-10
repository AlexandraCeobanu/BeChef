import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import UserSlice from "./slices/UserSlice";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: "root",
    storage,
}
const rootReducer = combineReducers(
    {
        user : UserSlice,
    }
);
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer
});
export default store;