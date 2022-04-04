import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TextState {
fontFamily: string;
fontSize : number;
interLetterSpacing:number;
interLineSpacing:number;
}

const initialState: TextState = {
fontFamily:"sans-serif",
fontSize : 16,
interLetterSpacing:5,
interLineSpacing:30,

}

export const TextSettings = createSlice({
name:"textSettings",
initialState,
reducers:{


}

});

 export const {} = TextSettings.actions;



 export default TextSettings.reducer;

