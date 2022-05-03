import styled from "styled-components";
import { createContext } from "react";

import COLORS from "../../constants/Colors";
import SIZE from "../../constants/Size";
import NavigationMenu from "../../components/NavigationMenu";
import NavigationBar from "../../components/NavigationBar";
import ColorsLists from "../../constants/ColorsList";

export const Context = createContext(ColorsLists);

const StyledContainer = styled.div`
  width: fit-content;
  margin: auto;
  background: ${COLORS.WARM_WHITE};
  border: 1px solid ${COLORS.GRAY};
  box-shadow: ${SIZE.ZERO}px ${SIZE.XX_SMALL}px ${SIZE.XX_SMALL}px
    ${COLORS.SPECIAL};
`;
export default function Home() {
  return (
    <Context.Provider value={ColorsLists}>
      <StyledContainer data-testid="homePageContainer">
        <NavigationBar />
        <NavigationMenu />
      </StyledContainer>
    </Context.Provider>
  );
}
