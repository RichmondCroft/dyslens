import styled from "styled-components";

const ColoredBox = styled.div<{ backgroundColor: string }>`
  border: 1px solid black;
  border-radius: 25px;
  margin-left: 2px;
  width: 28px;
  height: 28px;
  background-color: ${(props) => props.backgroundColor};
`;
function handleTextColor() {
  alert("hello");
}

type CssProps = {
  backgroundColor: string;
};

export default function ChangeTextColor({ backgroundColor }: CssProps) {
  return (
    <ColoredBox
      onClick={handleTextColor}
      backgroundColor={backgroundColor}
    ></ColoredBox>
  );
}
