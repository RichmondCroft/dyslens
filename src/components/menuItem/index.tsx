import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FontawesomeObject,
  IconLookup,
  IconDefinition,
  findIconDefinition,
} from "@fortawesome/fontawesome-svg-core";

import {
  faFontAwesomeFlag,
  faFontAwesome,
  faCoffee,
  faAngleRight,
  faBox,
} from "@fortawesome/free-solid-svg-icons";

const MenuItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  height: 68px;
  align-items: flex-start;
  margin-top: 5px;
  cursor: pointer;
  flex: 7;
`;

const StyledMainContainerItems = styled.div`
  width: 393px;
  height: 98px;
  background-color: #fefbeb;
  margin: auto;
  justify-content: center;
  position: relative;
`;

const MenuItemBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #c4c4c4;
  background: #c4c4c4;
  border-radius: 11px;
  width: 370px;
  height: 68px;
  position: absolute;
  top: 12px;
  left: 10px;
`;
const StyledTextHeading = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const StyledImageIcon = styled.div`
  flex: 1;
`;
const StyledArrowIcon = styled.div`
  flex: 1;
`;

type MenuItemProps = {
  textHeading: string;
  messageOverView: string;
  icon?: any;
};

export default function MenuItem({
  textHeading,
  messageOverView,
  icon,
}: MenuItemProps) {
  return (
    <StyledMainContainerItems>
      <MenuItemBox>
        <StyledImageIcon>
          <FontAwesomeIcon icon={icon} />
        </StyledImageIcon>

        <MenuItemInfoWrapper>
          <StyledTextHeading>{textHeading}</StyledTextHeading>
          <div>{messageOverView}</div>
        </MenuItemInfoWrapper>

        <StyledArrowIcon>
          <FontAwesomeIcon icon={faAngleRight} />
        </StyledArrowIcon>
      </MenuItemBox>
    </StyledMainContainerItems>
  );
}
