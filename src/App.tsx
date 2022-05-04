import { MemoryRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Home from "./pages/Home";
import TextSettings from "./pages/TextSettings";
import OverlayTint from "./pages/OverlayTint";
import LineFocus from "./pages/LineFocus";
import HighLighter from "./pages/HighLighter";
import HideImages from "./pages/HideImages";

const StyledAppContainer = styled.div`
  margin: 0px;
  width: 370px;
`;

function App() {
  return (
    <StyledAppContainer className="App">
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
  );
}

export default App;
