import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import COLORS from "../../constants/colors";
import SIZE from "../../constants/size";
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

const StyledBackButton = styled(FontAwesomeIcon)`
  color: ${COLORS.WHITE};
  font-size: ${SIZE.LARGE}px;
  cursor: pointer; 
`;

export default function NavigationBar() {
  const location = useLocation();
  let navigate = useNavigate();

  function handleOnBackClick() {
    navigate(-1);
  } 

  return (
    <NavBarContainer data-testid="navBarContainer">
      {location.pathname === '/' ?
        <StyledDysLensImage>
          <img data-testid="imageLogo" src={imageLogo} alt="dyslensLogo" />
        </StyledDysLensImage>
        : <StyledBackButton data-testid="nav-back-button" icon={faArrowLeft} onClick={handleOnBackClick} />
      }
      <StyledDysLensTextBox data-testid="dyslensText">
        Dyslens
      </StyledDysLensTextBox>
    </NavBarContainer>
  );
}
