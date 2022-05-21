import styled from 'styled-components';

import COLORS from '../../constants/colors';
import SIZE from '../../constants/size';

type Props = {
  label: string,
  children: React.ReactNode,
  horizontal?: boolean
}

const PanelContainer = styled.div<{ horizontal?: boolean }>`
  background-color: ${COLORS.LIGHT_YELLOW};
  border-radius: ${SIZE.MEDIUM}px;
  padding: ${SIZE.MEDIUM}px;
  margin: ${SIZE.SMALL}px;

  ${({ horizontal }) => horizontal ? `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  ` : ''}

  &:hover {
    background-color: ${COLORS.LIGHT_YELLOW_HOVER};
  }
`

const Label = styled.div`
  color: ${COLORS.DARK_BLUE};
  font-weight: bold;
`

function ComponentContainer(props: Props) {
  return <PanelContainer data-testid="panel" horizontal={props.horizontal}>
    <Label data-testid="panel-label">{props.label}</Label>
    <div data-testid="panel-content">{props.children}</div>
  </PanelContainer>
}

export default ComponentContainer;