import { useState, ChangeEvent } from "react";
import styled from "styled-components";
import COLORS from "../../constants/colors";

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledInput = styled.input``;
const StyledLabel = styled.label<{ checked: boolean }>`
  cursor: pointer;
  text-indent: -9999px;
  width: 50px;
  height: 30px;
  background: ${({ checked }) => (checked ? COLORS.GREEN : COLORS.GRAY)};
  display: block;
  border-radius: 100px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 2px;
    left: ${({ checked }) => (checked ? "24px" : "calc(10% - 5px)")};
    width: 26px;
    height: 26px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }
`;

export default function ToggleSwitch() {
  const [switchState, setSwitchState] = useState(true);
  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    console.log("---", e.target.checked);
    setSwitchState(!switchState);
  }
  return (
    <ToggleContainer>
      <StyledLabel htmlFor="checkbox" checked={switchState}>
        <StyledInput
          type="checkBox"
          id="checkbox"
          checked={switchState}
          onChange={handleOnChange}
        />
      </StyledLabel>
    </ToggleContainer>
  );
}
