import React from "react";
import styled from "styled-components";

import NavigationMenu from "../components/NavigationMenu";
import NavigationBar from "../components/NavigationBar";

const StyledContainer = styled.div`
  width: fit-conteBrowserRouternt;
  margin: auto;
  background: #fefbeb;
  border: 1px solid #adadad;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export default function Home() {
  return (
    <StyledContainer>
      <NavigationBar />
      <NavigationMenu />
    </StyledContainer>
  );
}
