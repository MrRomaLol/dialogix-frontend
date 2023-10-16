import styled from "styled-components";

export const LRBars = styled.div`
  background-color: rgba(84, 45, 102, 0.32);
  height: 100%;
  width: 100px;

  transition-duration: 200ms;
  transition-timing-function: ease-in;

  &:hover {
    width: 300px;
  }
`

export const BarsBorder = styled.div`
  height: 100%;
  width: 22px;
  background-color: rgba(188, 44, 201, 1);
  z-index: 15;
`