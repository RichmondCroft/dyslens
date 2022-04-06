import React from "react";
import styled from "styled-components";

import NavigationMenu from "./components/navigationMenu";
import NavigationBar from "./components/navigationBar";
import HideImage from "./components/hideImage";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: auto;
  background: #fefbeb;
  border: 1px solid #adadad;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

function App() {
  return (
    <StyledContainer>
      <NavigationBar />
      <NavigationMenu />
      <HideImage />
    </StyledContainer>
  );
}

export default App;
