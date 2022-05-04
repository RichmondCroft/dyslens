import styled from 'styled-components';

import COLORS from '../../constants/colors';
import SIZE from '../../constants/size';

type Props = {
  label: string,
  children: React.ReactNode
}

const PanelContainer = styled.div`
  background-color: ${COLORS.LIGHT_YELLOW};
  border-radius: ${SIZE.MEDIUM}px;
  padding: ${SIZE.MEDIUM}px;
` 

const Label = styled.div`
  color: ${COLORS.DARK_BLUE};
  font-weight: bold;
`

function ComponentContainer(props: Props) {
  return <PanelContainer data-testid="panel">
    <Label data-testid="panel-label">{props.label}</Label>
    <div data-testid="panel-content">{props.children}</div>
  </PanelContainer>
}

export default ComponentContainer;