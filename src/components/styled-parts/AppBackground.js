import styled from "styled-components";

export const AppBackground = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;

  background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(img/AppBG.webp) no-repeat center center fixed;
  background-size: cover;
  filter: blur(5px);
  transform: scale(1.1);
`

export const AppContent = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
`