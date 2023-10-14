import React from 'react';
import styled from "styled-components";

const Left = styled.div`
  height: 55px;
  flex: 1;
`

const LText = styled.p`
  color: #9788b0;
  font-family: "Goldman-Regular", Helvetica, serif;
  font-size: 28px;
  font-weight: 400;
  height: 64px;
  left: 93px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 0;
`

const LeftSide = (props) => {
    return <Left>
        <LText {...props}>DialogiX.inc</LText>
    </Left>
};

export default LeftSide;