import { configureStore } from "@reduxjs/toolkit";
import textSettingsReducer from "./textSettingsReducer";

export const store = configureStore({
reducer :{
    TextSettings : textSettingsReducer
}
})