import React from "react";
import styled from "styled-components";
import COLORS from "../constants/Colors";
import SIZE from "../constants/Size";

import NavigationMenu from "../components/NavigationMenu";
import NavigationBar from "../components/NavigationBar";

const StyledContainer = styled.div`
  width: fit-content;
  margin: auto;
  background: ${COLORS.WARM_WHITE};
  border: 1px solid ${COLORS.GRAY};
  box-shadow: ${SIZE.ZERO}px ${SIZE.XX_SMALL}px ${SIZE.XX_SMALL}px
    ${COLORS.SPECIAL};
`;
export default function Home() {
  return (
    <StyledContainer>
      <NavigationBar />
      <NavigationMenu />
    </StyledContainer>
  );
}
