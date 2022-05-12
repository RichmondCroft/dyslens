import React from "react";
import COLORS from "../../constants/colors";

export type StorageData = {
  enabled: boolean,
  text: {
    fontFamily?: string,
    textColor?: string
  },
  overlay: {
    enabled: boolean,
    color: string
  }
}

type AppState = {
  appState: StorageData,
  setAppState: (updatedData: StorageData) => void
}

const initialState: StorageData = {
  enabled: false,
  text: {
  },
  overlay: {
    enabled: false,
    color: COLORS.LIGHT_YELLOW
  }
}

const StoreContext = React.createContext<AppState>({
  appState: initialState, 
  setAppState: (_store) => {}
});
export default StoreContext;