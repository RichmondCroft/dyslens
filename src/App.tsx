import React from "react";
import styled from "styled-components";

import NavigationMenu from "./components/NavigationMenu";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from "./pages/Home";
import TextSettings from "./pages/TextSettings";
import OverlayTint from "./pages/OverlayTint";
import LineFocus from "./pages/LineFocus";
import Highlighter from "./pages/Highlighter";
import HideImages from "./pages/HideImages";

const history = createBrowserHistory();

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-settings" element={<TextSettings />}></Route>
          <Route path="/contactUs" element={<OverlayTint />}></Route>
          <Route path="/aboutUs" element={<LineFocus />}></Route>
          <Route path="/products" element={<Highlighter />}></Route>
          <Route path="/aboutUs" element={<HideImages />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
