import React from "react";
import styled from "styled-components";
import COLORS from "../../constants/Colors";

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${COLORS.DARK_BLUE};
  align-items: center;
  padding: 15px;
`;

const StyledDysLensImage = styled.div`
  border-radius: 15px;
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
