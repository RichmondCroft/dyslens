import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import TextSettings from "./pages/TextSettings";
import OverlayTint from "./pages/OverlayTint";
import LineFocus from "./pages/LineFocus";
import Highlighter from "./pages/Highlighter";
import HideImages from "./pages/HideImages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-settings" element={<TextSettings />}></Route>
          <Route path="/overlay-tint" element={<OverlayTint />}></Route>
          <Route path="/line-focus" element={<LineFocus />}></Route>
          <Route path="/highlighter" element={<Highlighter />}></Route>
          <Route path="/hide-images" element={<HideImages />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
