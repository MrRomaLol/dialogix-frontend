import React from 'react';
import styled from "styled-components";
import {IconBackground, StyledIcon} from "./SideIconParts";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  margin-top: 10px;
  margin-bottom: 10px;
  
  width: 100px;
  height: 70px;
`

const FriendsIconBackground = styled(IconBackground)`
  background-color: #4E1867;
`

const BarButton = ({icon, onClick, isSelected, children, dataTooltipId}) => {
    return (
        <Container data-tooltip-id={dataTooltipId}>
            <FriendsIconBackground isSelected={isSelected} onClick={() => onClick?.()}>
                <StyledIcon icon={icon}/>
                {children}
            </FriendsIconBackground>
        </Container>
    );
};

export default BarButton;