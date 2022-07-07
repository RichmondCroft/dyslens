import styled from "styled-components";

import COLORS from "../../constants/colors";
import SIZE from "../../constants/size";
import NavigationMenu from "../../components/NavigationMenu";
import NavigationBar from "../../components/NavigationBar";
import imageLogo from "./../../images/icon-16.png";


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
    <StyledContainer data-testid="homePageContainer">
      <NavigationBar>
<img data-testid="imageLogo" src={imageLogo} alt="dyslensLogo"/>
      </NavigationBar>
      <NavigationMenu />
    </StyledContainer>
  );
}
