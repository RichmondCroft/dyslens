import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../constants/Colors";

const MenuItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px 0;
`;

const MenuItemBox = styled.div`
  display: flex;
  flex-direction: row;
  background: ${COLORS.LIGHT_YELLOW};
  border-radius: 11px;
  margin-top: 8px;
  margin-bottom: 10px;
  align-items: center;
`;
const StyledTextHeading = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const StyledImageIcon = styled.div`
  padding: 2px;
  font-weight: bold;
  font-size: x-large;
  width: 54px;
  text-align: center;
`;
const StyledArrowIcon = styled.div`
  padding: 15px;
  font-size: x-large;
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
  );
}
