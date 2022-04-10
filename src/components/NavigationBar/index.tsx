import React from "react";
import styled from "styled-components";
import COLORS from "../../constants/Colors";
import SIZE from "../../constants/Size";
import imageLogo from "./../../images/icon-16.png";

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${COLORS.DARK_BLUE};
  align-items: center;
  padding: ${SIZE.MEDIUM}px;
`;

const StyledDysLensImage = styled.div`
  border-radius: ${SIZE.MEDIUM}px;
  display: flex;
  justify-content: center;
`;

const StyledDysLensTextBox = styled.div`
  color: ${COLORS.WHITE};
  font-weight: bold;
  padding: ${SIZE.ZERO}px ${SIZE.X_SMALL}px;
`;

export default function NavigationBar() {
  return (
    <NavBarContainer>
      <StyledDysLensImage>
        <img src={imageLogo} alt="dyslensLogo" />
      </StyledDysLensImage>
      <StyledDysLensTextBox>Dyslens</StyledDysLensTextBox>
    </NavBarContainer>
  );
}
