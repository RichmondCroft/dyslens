import styled from "styled-components";

import ColorPicker from "../../components/ColorPicker";
import ComponentContainer from '../../components/ComponentContainer';

const StyledOverLayTintContainer = styled.div``;

export default function OverlayTint() {
  return (
    <StyledOverLayTintContainer data-testid="overLayTintContainer">
      <ComponentContainer label="Color">
        <ColorPicker />
      </ComponentContainer>
    </StyledOverLayTintContainer>
  );
}
