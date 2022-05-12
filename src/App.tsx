import { useEffect, useState } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import "./App";

import Home from "./pages/Home";
import TextSettings from "./pages/TextSettings";
import OverlayTint from "./pages/OverlayTint";
import LineFocus from "./pages/LineFocus";
import HighLighter from "./pages/HighLighter";
import HideImages from "./pages/HideImages";
import StoreContext, { StorageData } from "./storage/StoreContext";
import COLORS from "./constants/colors";
import { fetchAppStateFromStorage } from "./storage/chrome-storage.ts";

const StyledAppContainer = styled.div`
  margin: 0px;
  padding: 0px;
  width: 370px;
`;

const initialState = {
  enabled: false,
  text: {
  },
  overlay: {
    enabled: false,
    color: COLORS.LIGHT_YELLOW
  }
}

function App() {
  const [appState, setAppState] = useState<StorageData | null>(null);

  useEffect(() => {
    fetchAppStateFromStorage().then((state: StorageData) => {
      setAppState(state);
    });
  }, [])

  return (
    appState === null ?
      <div>Loading...</div> :
      <StoreContext.Provider value={{ appState, setAppState }}>
        <StyledAppContainer>
          <MemoryRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/text-settings" element={<TextSettings />}></Route>
              <Route path="/overlay-tint" element={<OverlayTint />}></Route>
              <Route path="/line-focus" element={<LineFocus />}></Route>
              <Route path="/highlighter" element={<HighLighter />}></Route>
              <Route path="/hide-images" element={<HideImages />}></Route>
            </Routes>
          </MemoryRouter>
        </StyledAppContainer>
      </StoreContext.Provider>
  );
}

export default App;
