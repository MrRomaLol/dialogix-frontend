import React from 'react';
import styled from "styled-components";


const FlexBox = styled.div`
  display: flex;
  flex: ${props => props.flex || '1'};
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'stretch'};
  align-items: ${props => props.align || 'stretch'};
`

const Flex = (props) => {
    return (
        <FlexBox {...props} />
    );
};

export default Flex;