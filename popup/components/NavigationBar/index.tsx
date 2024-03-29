import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from '@mui/material/Button';


import COLORS from "../../constants/colors";
import SIZE from "../../constants/size";
import imageLogo from "./../../images/icon-16.png";

import { refreshActiveTab } from "~popup/chrome-utils/tabs";

import StoreContext from "./../../storage/StoreContext"
import { useContext, useState } from "react";


type InputProps = {
  color: string,
  marginLeft: string,
  value?: boolean
}

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex:1;
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

const InfoPanel = styled.div`
  text-align: center;
  font-size: ${SIZE.SMALL}px;
  background: ${COLORS.WARM_WHITE};
  padding-top: ${SIZE.SMALL}px;
`;

const RefreshAnchor = styled.span`
  color: ${COLORS.DARK_BLUE};
  cursor: pointer;
  text-decoration: underline;
`;

const StyledDisableButton = styled(Button)<InputProps>({
  color: "white",
  marginLeft: "auto",
}) as typeof Button;



export default function NavigationBar() {
  const { appData, setAppState } = useContext(StoreContext);

  const disabled = (!appData.text.enabled &&
    !appData.overlay.enabled &&
    !appData.lineFocus.enabled &&
    !appData.textToSpeech.enabled);

  function handleOnDisableClick() {

    setAppState(
      {
        ...appData,
        text: {
          ...appData.text,
          enabled: false,
        },
        overlay: {
          ...appData.overlay,
          enabled: false,
        },
        lineFocus: {
          ...appData.lineFocus,
          enabled: false,
        },
        textToSpeech: {
          ...appData.textToSpeech,
          enabled: false
        }
      })
  }


  const location = useLocation();
  let navigate = useNavigate();

  function handleOnBackClick() {
    navigate(-1);
  }

  function handleOnRefreshClick() {
    refreshActiveTab();
  }

  return (
    <>
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
        <StyledDisableButton onClick={handleOnDisableClick} disabled={disabled} variant="outlined"> Disable All</StyledDisableButton>
      </NavBarContainer>
      <InfoPanel>If the settings are not applied try to&nbsp;
        <RefreshAnchor onClick={handleOnRefreshClick}>refresh</RefreshAnchor>&nbsp;the page.
      </InfoPanel>
    </>
  );
}
