import React from "react";
import COLORS from "../../constants/colors";

type StorageData = {
  enabled: boolean,
  text: {
    fontFamily?: string,
    textColor?: string
  },
  overlay: {
    enabled: boolean,
    color:  string
  }
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

const StoreContext = React.createContext<StorageData>(initialState);
export default StoreContext;