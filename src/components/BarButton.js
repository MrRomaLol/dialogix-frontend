import React from 'react';
import styled from "styled-components";
import {IconBackground, StyledIcon} from "./styled-parts/SideIconParts";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 100px;
  height: 100px;
  
  float: ${({float}) => float || 'none'}
`

const FriendsIconBackground = styled(IconBackground)`
  background-color: #4E1867;
`

const BarButton = ({icon, float}) => {
    return (
        <Container float={float}>
            <FriendsIconBackground>
                <StyledIcon icon={icon}/>
            </FriendsIconBackground>
        </Container>
    );
};

export default BarButton;