import styled from "styled-components";
import { useContext } from "react";

import { Context } from "../../pages/Home";
// import ColorsLists from "../../constants/ColorsList";

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
  display: flex;
  flex-direction: row;
  width: 350px;
  height: 97px;
  align-items: center;
  list-style-type: none;
`;

export default function ColorPicker() {
  const color = useContext(Context);

  function handleOnColoredBox(item: string) {
    console.log("item of colorbox", item);
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
