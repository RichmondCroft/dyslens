import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
`;


export default function BackButton(){
    return <div >
        <StyledFontAwesomeIcon icon={faArrowLeft} data-testid="button-icon" /> 
    </div>
}