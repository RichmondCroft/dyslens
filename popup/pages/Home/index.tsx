import styled from "styled-components";

import COLORS from "../../constants/colors";
import SIZE from "../../constants/size";
import NavigationMenu from "../../components/NavigationMenu";

const StyledContainer = styled.div`
  width: fit-content;
  margin: auto;
`;
export default function Home() {
  return (
    <StyledContainer data-testid="homePageContainer">
      <NavigationMenu />
    </StyledContainer>
  );
}
