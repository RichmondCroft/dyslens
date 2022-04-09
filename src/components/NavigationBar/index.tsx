import React from "react";
import styled from "styled-components";
import COLORS from "../../constants/Colors";
import SIZE from "../../constants/Size";

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
`;

const StyledDysLensTextBox = styled.div`
  color: ${COLORS.WHITE};
  font-weight: bold;
`;

const StyledSwitch = styled.div``;

export default function NavigationBar() {
  return (
    <NavBarContainer>
      <StyledDysLensImage></StyledDysLensImage>
      <StyledDysLensTextBox>Dyslens</StyledDysLensTextBox>
    </NavBarContainer>
  );
}
