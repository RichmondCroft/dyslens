import { useEffect, useState } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";

import "./App";

import { fetchAppStateFromStorage, saveAppState } from "./storage/chrome-storage";
import HideImages from "./pages/HideImages";
import HighLighter from "./pages/HighLighter";
import Home from "./pages/Home";
import LineFocus from "./pages/LineFocus";
import OverlayTint from "./pages/OverlayTint";
import StoreContext, { AppData } from "./storage/StoreContext";
import TextSettings from "./pages/TextSettings";
import NavigationBar from "./components/NavigationBar";
import TextToSpeech from "./pages/TextToSpeech";
import COLORS from "./constants/colors";
import { FONTS } from './constants/fonts';
import './App.css';


const StyledAppContainer = styled.div`
  margin: 0px;
  padding: 0px;
  width: 370px;
  background: ${COLORS.WARM_WHITE};
  font-family: ${({ fontFamily }) => fontFamily};
`;

function App() {
  const [appData, setAppData] = useState<AppData | null>(null);
  const selectedFontFamily = appData ? appData.text.fontFamily || FONTS.OpenDyslexic.name : FONTS.OpenDyslexic.name;

  useEffect(() => {
    fetchAppStateFromStorage().then((state: AppData) => {
      setAppData(state);
    });
  }, [])

  function setAppStateWrapper(state: AppData) {
    saveAppState(state);
    setAppData(state);
  }

  const theme = createTheme({
    typography: {
      fontFamily: selectedFontFamily
    }
  });

  return (
    appData === null ?
      <Box sx={{
        width: 100,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}>
        <CircularProgress />
      </Box> :
      <ThemeProvider theme={theme}>
        <StoreContext.Provider value={{ appData, setAppState: setAppStateWrapper }}>
          <StyledAppContainer fontFamily={selectedFontFamily}>
            <MemoryRouter>
              <NavigationBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/text-settings" element={<TextSettings />}></Route>
                <Route path="//text-to-speech" element={<TextToSpeech />}></Route>
                <Route path="/overlay-tint" element={<OverlayTint />}></Route>
                <Route path="/line-focus" element={<LineFocus />}></Route>
                <Route path="/highlighter" element={<HighLighter />}></Route>
                <Route path="/hide-images" element={<HideImages />}></Route>
              </Routes>
            </MemoryRouter>
          </StyledAppContainer>
        </StoreContext.Provider>
      </ThemeProvider >
  );
}

export default App;
