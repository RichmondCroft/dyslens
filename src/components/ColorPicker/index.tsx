import styled from "styled-components";
import { useContext } from "react";

import { Context } from "../../pages/Home";
import changeTextColor from "../../chrome-utils/changeTextColor";
import SIZE from "../../constants/Size";

const ColoredBox = styled.li<{ backgroundColor: string }>`
  border-radius: 25px;
  margin-left: 2px;
  width: 28px;
  height: 28px;
  background-color: ${(props) => props.backgroundColor};
  text-decoration: none;
  cursor: pointer;
`;
const StyledTextColorContainer = styled.ul`
  padding: ${SIZE.X_SMALL}px ${SIZE.XX_SMALL}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style-type: none;
`;

export default function ColorPicker() {
  const color = useContext(Context);

  function handleOnColoredBox(color: string) {
    changeTextColor(color);
  }
  return (
    <StyledTextColorContainer>
      {color.map((item) => {
        return (
          <ColoredBox
            backgroundColor={item}
            key={item}
            onClick={() => handleOnColoredBox(item)}
          ></ColoredBox>
        );
      })}
    </StyledTextColorContainer>
  );
}
