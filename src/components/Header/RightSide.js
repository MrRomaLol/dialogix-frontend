import React from 'react';
import styled from "styled-components";
import LRText from "./LeftSide";
import MicHPhone from "../MicHPhone";

const Right = styled.div`
  height: 55px;
  flex: 1;
`

const RText = styled(LRText)`
  left: 93px; 
`

const RightSide = () => {
    return <Right>
        <RText></RText>
        <MicHPhone/>
    </Right>
};

export default RightSide;