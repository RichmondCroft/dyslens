import React from "react";
import { initialState } from "../chrome-storage";

export type AppData = {
  enabled: boolean,
  text: {
    enabled: boolean,
    fontFamily?: string,
    textColor?: string
  },
  overlay: {
    enabled: boolean,
    color: string,
    opacity: number
  },
  lineFocus: {
    enabled: boolean,
    color: string,
    height: number,
    opacity: number
  }
  textToSpeech: {
    enabled: boolean,
    pitch: number,
    rate: number,
    voice: string,
    volume: number
  }
}

type AppState = {
  appData: AppData,
  setAppState: (updatedData: AppData) => void
}
const StoreContext = React.createContext<AppState>({
  appData: initialState,
  setAppState: (_store) => { }
});

export default StoreContext;