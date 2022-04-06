import React from "react";
import styled from "styled-components";

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #1f4070;
  border: 1px solid black;
  align-items: center;
  padding: 15px;
`;

const StyledDysLensImage = styled.div`
  background-color: white;
  border-radius: 15px;
`;

const StyledDysLensTextBox = styled.div`
  color: aliceblue;
  font-weight: bold;
`;

const StyledSwitch = styled.div`
  background-color: #33d464;
  border-radius: 15px;
`;

export default function NavigationBar() {
  return (
    <NavBarContainer>
      <StyledDysLensImage></StyledDysLensImage>
      <StyledDysLensTextBox>Dyslens</StyledDysLensTextBox>
    </NavBarContainer>
  );
}
