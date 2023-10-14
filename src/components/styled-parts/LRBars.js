import styled from "styled-components";

export const LRBars = styled.div`
  background-color: rgba(188, 44, 201, 0.62);
  height: 100%;
  width: 100px;

  transition-duration: 200ms;
  transition-timing-function: ease-in;
  
  &:hover {
    width: 200px;
  }
`