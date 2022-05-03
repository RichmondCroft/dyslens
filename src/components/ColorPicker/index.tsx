import styled from "styled-components";
import { useContext } from "react";

import { Context } from "../../pages/Home";
import changeTextColor from "../../chrome-utils/changeTextColor";
import SIZE from "../../constants/Size";
import ColorsList from "../../constants/ColorsList";

const ColoredBox = styled.li<{ backgroundColor: string }>`
  border-radius: ${SIZE.LARGE}px;
  margin-left: 2px;
  width: ${SIZE.LARGE}px;
  height: ${SIZE.LARGE}px;
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
  function handleOnColoredBox(color: string) {
    changeTextColor(color);
  }

  return (
    <StyledTextColorContainer>
      {ColorsList.map((item) => {
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
