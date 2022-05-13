import { useState, ChangeEvent } from "react";
import styled from "styled-components";
import COLORS from "../../constants/colors";

type Props = {
  on: boolean;
  onStateChange?: (updatedState: boolean) => void;
};

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

export default function Toggle(props: Props) {
  const [switchState, setSwitchState] = useState(props.on);
  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setSwitchState(!switchState);
    if (props.onStateChange) {
      props.onStateChange(!switchState);
    }
  }

  return (
    <StyledLabel htmlFor="checkbox" checked={switchState} data-testid="toggle">
      <input
        type="checkBox"
        id="checkbox"
        checked={switchState}
        onChange={handleOnChange}
      />
    </StyledLabel>
  );
}
