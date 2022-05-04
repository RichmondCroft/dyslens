import styled from "styled-components";

import ColorPicker from "../../components/ColorPicker";
import ComponentContainer from '../../components/ComponentContainer';
import Toggle from "../../components/Toggle";
import SIZE from "../../constants/size";

const StyledOverLayTintContainer = styled.div`
  padding: ${SIZE.X_SMALL}px;
`;

const Spacer = styled.div`
  height: ${SIZE.SMALL}px;
`

export default function OverlayTint() {
  function handleOnToggleStateChange() {
    console.log('changed');
  }

  return (
    <StyledOverLayTintContainer data-testid="overLayTintContainer">
      <ComponentContainer label="Enabled">
        <Toggle on={false} onStateChange={handleOnToggleStateChange} />
      </ComponentContainer>
      <Spacer />
      <ComponentContainer label="Color">
        <ColorPicker />
      </ComponentContainer>
    </StyledOverLayTintContainer>
  );
}
