import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/index";
import TextSettings from "./pages/TextSettings/index";
import OverlayTint from "./pages/OverlayTint/index";
import LineFocus from "./pages/LineFocus/index";
import HighLighter from "./pages/HighLighter/index";
import HideImages from "./pages/HideImages/index";

function App() {
  return (
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
  );
}

export default App;
