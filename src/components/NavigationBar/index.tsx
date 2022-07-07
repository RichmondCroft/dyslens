import styled from "styled-components";
import COLORS from "../../constants/colors";
import SIZE from "../../constants/size";
// import imageLogo from "./../../images/icon-16.png";

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

type Props = {
  children: React.ReactNode
}

export default function NavigationBar(props:Props) {
  return (
    <NavBarContainer data-testid="navBarContainer">
      <StyledDysLensImage>
      {props.children}
      </StyledDysLensImage>
      <StyledDysLensTextBox data-testid="dyslensText">
        Dyslens
      </StyledDysLensTextBox>
    </NavBarContainer>
  );
}
