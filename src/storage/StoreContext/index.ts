import React from "react";
import COLORS from "../../constants/colors";

export type AppData = {
  enabled: boolean,
  text: {
    enabled: boolean,
    fontFamily?: string,
    textColor?: string
  },
  overlay: {
    enabled: boolean,
    color: string
  }
}

type AppState = {
  appData: AppData,
  setAppState: (updatedData: AppData) => void
}

const initialState: AppData = {
  enabled: false,
  text: {
    enabled: false
  },
  overlay: {
    enabled: false,
    color: COLORS.LIGHT_YELLOW
  }
}

const StoreContext = React.createContext<AppState>({
  appData: initialState, 
  setAppState: (_store) => {}
});
export default StoreContext;