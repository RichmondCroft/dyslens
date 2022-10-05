import { useState } from "react";
import styled, { css } from "styled-components";
import COLORS from "../../constants/colors";

import ColorsList from "../../constants/colorsList";
import SIZE from "../../constants/size";

type Props = {
  color?: string,
  onChange: (color: string) => void,
  testId: string,
  displayDefaultColor?: boolean
}

const commonColorBox = css`
  border-radius: ${SIZE.LARGE}px;
  margin-left: 2px;
  width: ${SIZE.LARGE}px;
  height: ${SIZE.LARGE}px;
  background-color: ${(props) => props.backgroundColor};
  text-decoration: none;
  cursor: pointer;
  ${({ isSelected }) => `
    border: ${isSelected ? `3px solid ${COLORS.DARK_BLUE}` : 'none'};
  `}
`

const ColoredBox = styled.li<{ backgroundColor: string, isSelected: boolean }>`
  ${commonColorBox}
`;

const NoColorBox = styled.li<{ backgroundColor: string, isSelected: boolean }>`
  ${commonColorBox}
  ${({ isSelected }) => `
    ${isSelected ? '' : `
      box-sizing: border-box;
      border: 1px solid ${COLORS.DARK_BLUE};
    `};
  `}
`;


const StyledTextColorContainer = styled.ul`
  padding: ${SIZE.X_SMALL}px ${SIZE.XX_SMALL}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style-type: none;
`;

export default function ColorPicker({ color, onChange, testId, displayDefaultColor }: Props) {
  const [stateColor, setStateColor] = useState(color);

  function handleOnColoredBox(color?: string) {
    setStateColor(color);
    onChange(color);
  }

  return (
    <StyledTextColorContainer data-testid={testId}>
      {displayDefaultColor && <NoColorBox
        isSelected={!stateColor}
        key='transparent'
        onClick={() => handleOnColoredBox()}
        data-testId='transparent'
      />}
      {ColorsList.map((item) => {
        return (
          <ColoredBox
            backgroundColor={item}
            isSelected={stateColor === item}
            key={item}
            onClick={() => handleOnColoredBox(item)}
            data-testId={item}
          />
        );
      })}
    </StyledTextColorContainer>
  );
}
