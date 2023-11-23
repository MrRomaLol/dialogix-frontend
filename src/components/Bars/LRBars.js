import styled from "styled-components";

export const LRBars = styled.div`
  background-color: rgba(84, 45, 102, 0.32);
  height: 100%;
  width: 100px;
  
  position: relative;
  display: flex;
  flex-direction: column;
`

export const BarsBorder = styled.div`
  height: 100%;
  width: 22px;
  background-color: rgba(188, 44, 201, 1);
  z-index: 15; 
  transition-duration: 200ms;
`

export const ScrollerBarBox = styled.div`
  flex: 1;

  position: relative;
`

export const ScrollerBar = styled.div`
  overflow-y: scroll;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  &::-webkit-scrollbar {
    display: none;
  }
`