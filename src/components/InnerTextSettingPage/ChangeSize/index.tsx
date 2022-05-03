import styled from "styled-components";
import { useState } from "react";

import SIZE from "../../../constants/size";

const StyledSliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  margin-top: ${SIZE.X_SMALL}px;
  padding: ${SIZE.X_SMALL}px ${SIZE.XX_SMALL}px;
`;
export default function ChangeSize() {
  const [size, setSize] = useState(0);

  function handleSizeChange(e: any) {
    setSize(e.target.value);
  }

  return (
    <StyledSliderContainer>
      <label htmlFor="sizePx">Size:</label>
      <input
        type="range"
        id="sizePx"
        value={size}
        name="sizePx"
        min="0"
        max="5"
        onChange={handleSizeChange}
      />
    </StyledSliderContainer>
  );
}
