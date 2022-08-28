import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import COLORS from "../../constants/colors";
import SIZE from "../../constants/size";

const MenuItemStyledLink = styled(Link)`
  text-decoration: none;
  color: ${COLORS.DARK_BLUE};
`;

const MenuItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${SIZE.X_SMALL}px ${SIZE.ZERO};
`;

const MenuItemBox = styled.div`
  display: flex;
  flex-direction: row;
  background: ${COLORS.LIGHT_YELLOW};
  border-radius: ${SIZE.SMALL}px;
  margin-top: ${SIZE.X_SMALL}px;
  margin-bottom: ${SIZE.SMALL}px;
  align-items: center;

  &:hover {
    background-color: ${COLORS.LIGHT_YELLOW_HOVER};
  }
`;
const StyledTextHeading = styled.div`
  font-size: ${SIZE.LARGE}px;
  font-weight: bold;
`;

const StyledImageIcon = styled.div`
  padding: ${SIZE.MEDIUM}px;
  font-weight: bold;
  font-size: ${SIZE.XX_LARGE}px;
  width: ${SIZE.XXX_LARGE}px;
  text-align: center;
`;
const StyledArrowIcon = styled.div`
  padding: ${SIZE.MEDIUM}px;
  font-size: ${SIZE.XX_LARGE}px;
`;

type MenuItemProps = {
  textHeading: string;
  messageOverView: string;
  icon?: any;
  to: string;
  testId: string;
};

export default function MenuItem({
  textHeading,
  messageOverView,
  icon,
  to,
  testId
}: MenuItemProps) {
  return (
    <MenuItemStyledLink to={to}>
      <MenuItemBox data-testid={testId}>
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
    </MenuItemStyledLink>
  );
}
