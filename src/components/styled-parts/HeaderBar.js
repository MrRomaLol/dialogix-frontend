import styled from "styled-components";

export const HeaderBack = styled.div`
  background-color: rgba(42, 20, 50, 0.4);
`

export const LeftRightBars = styled(HeaderBack)`
  width: 450px;
  height: 50px;
`

export const HeaderBorders = styled(LeftRightBars)`
  position: absolute;
  top: 0;
  left: 0;
  
  background-color: rgba(188, 44, 201, 1);
`