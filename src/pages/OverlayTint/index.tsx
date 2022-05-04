import styled from "styled-components";

import ColorPicker from "../../components/ColorPicker";
import Panel from '../../components/Panel';

const StyledOverLayTintContainer = styled.div``;

export default function OverlayTint() {
  return (
    <StyledOverLayTintContainer data-testid="overLayTintContainer">
      <Panel label="color">
        <ColorPicker />
      </Panel>
    </StyledOverLayTintContainer>
  );
}
