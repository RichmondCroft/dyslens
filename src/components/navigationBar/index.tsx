import React from "react";
import styled from "styled-components";

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 393px;
  height: 55px;
  background-color: #1f4070;
  border: 1px solid black;
  align-items: center;
`;

const StyledDysLensImage = styled.div`
  background-color: white;
  height: 25px;
  width: 25px;
  border-radius: 15px;
  margin-left: 6px;
`;

const StyledDysLensTextBox = styled.div`
  color: aliceblue;
  font-weight: bold;
  flex: 1;
  margin-left: 6px;
`;

const StyledSwitch = styled.div`
  background-color: #33d464;
  height: 25px;
  width: 50px;
  border-radius: 15px;
  margin-right: 6px;
`;

export default function NavigationBar() {
  return (
    <NavBarContainer>
      <StyledDysLensImage></StyledDysLensImage>
      <StyledDysLensTextBox>Dyslens</StyledDysLensTextBox>
      <StyledSwitch></StyledSwitch>
    </NavBarContainer>
  );
}
