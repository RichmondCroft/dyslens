import styled from "styled-components";
import { useState } from "react";

const StyledSliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  width: 350px;
  height: 97px;
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
