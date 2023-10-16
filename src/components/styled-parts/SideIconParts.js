import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const IconBackground = styled.div`
  width: 70px;
  height: 70px;
  
  border-radius: 50%;
  
  filter: drop-shadow(black 0 0 20px);
  
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledIcon = styled(FontAwesomeIcon)`
  color: #CA71D1;
  width: 40px;
  height: 40px;
`