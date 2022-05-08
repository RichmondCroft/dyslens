import { useContext } from "react";
import styled from "styled-components";

import ColorPicker from "../../components/ColorPicker";
import ComponentContainer from "../../components/ComponentContainer";
import Toggle from "../../components/Toggle";
import SIZE from "../../constants/size";
import StoreContext from "../../storage/StoreContext";

const StyledOverLayTintContainer = styled.div`
  padding: ${SIZE.X_SMALL}px;
`;

const Spacer = styled.div`
  height: ${SIZE.SMALL}px;
`;

export default function OverlayTint() {
  const { appState, setAppState } = useContext(StoreContext)

  function handleOnToggleStateChange(checked: boolean) {
    setAppState({
      ...appState,
      overlay: {
        ...appState.overlay,
        enabled: checked
      }
    })
  }

  return (
    <StyledOverLayTintContainer data-testid="overLayTintContainer">
      <ComponentContainer label="Enabled">
        <Toggle on={appState.enabled} onStateChange={handleOnToggleStateChange} />
      </ComponentContainer>
      <Spacer />
      <ComponentContainer label="Color">
        <ColorPicker />
      </ComponentContainer>
    </StyledOverLayTintContainer>
  );
}
