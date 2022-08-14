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
    color: string,
    opacity: 0.5
  },
  lineFocus: {
    enabled: boolean,
    color: string,
    height: number,
    opacity: 0.5
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
  },
  lineFocus: {
    enabled: false,
    color: COLORS.LIGHT_YELLOW,
    height: 200
  }
}

const StoreContext = React.createContext<AppState>({
  appData: initialState, 
  setAppState: (_store) => {}
});
export default StoreContext;