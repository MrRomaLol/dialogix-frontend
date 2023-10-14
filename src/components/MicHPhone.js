import React from 'react';
import styled from "styled-components";
import Microphone from "./Microphone";
import Headphones from "./Headphones";

const MPHButtons = styled.div`
  
`

const MicHPhone = (props) => {
    return <MPHButtons>
        <Microphone {...props}></Microphone>
        <Headphones {...props}></Headphones>
    </MPHButtons>
};

export default MicHPhone;