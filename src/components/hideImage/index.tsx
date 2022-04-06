import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFontAwesomeFlag,
  faFontAwesome,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

const HideImageMainContainer = styled.div`
  width: 393px;
  height: 98px;
  background-color: #fefbeb;
  position: relative;
`;

const MenuItemHideBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #c4c4c4;
  background: #c4c4c4;
  border-radius: 11px;
  width: 370px;
  height: 68px;
  position: absolute;
  top: 12%;
  left: 10px;
`;

const StyledHideImageIcon = styled.div`
  flex: 1;
`;

const HideItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  height: 68px;
  align-items: flex-start;
  margin-top: 5px;
  cursor: pointer;
  flex: 7;
`;

const StyledTextHeading = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const StyledmessageOverView = styled.div``;
const StyledSwitchIcon = styled.div`
  flex: 1;
`;

export default function HideImage() {
  return (
    <HideImageMainContainer>
      <MenuItemHideBox>
        <StyledHideImageIcon>
          <FontAwesomeIcon icon={faImage} />
        </StyledHideImageIcon>

        <HideItemInfoWrapper>
          <StyledTextHeading>Hide Images</StyledTextHeading>
          <StyledmessageOverView>
            Hides images and gifs from the page
          </StyledmessageOverView>
        </HideItemInfoWrapper>

        <StyledSwitchIcon></StyledSwitchIcon>
      </MenuItemHideBox>
    </HideImageMainContainer>
  );
}
