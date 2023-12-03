import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const CardContainer = styled.div`
  height: 100px;
  width: 400px;
  margin-bottom: 30px;
  position: relative;
  cursor: pointer;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%);
  
  &:hover {
    background-color: rgba(188, 44, 201, 0.1);
  }
`

export const FriendCardBack = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(61, 38, 84, 0.2);

  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%);

  display: flex;

  color: white;
  font-size: 24px;
  font-family: JetBrains Mono, serif;
`

export const FriendCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  user-select: none;
`

export const FriendCardIconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 12px 0 12px 12px;
`

export const FriendCardBorder = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(188, 44, 201, 0.62);

  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%, 0 0,
  2px 2px, 2px calc(100% - 2px), calc(100% - 50px) calc(100% - 2px), calc(100% - 2px) calc(100% - 50px), calc(100% - 2px) 2px, 2px 2px)
`

export const FriendCardIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  transition-duration: 200ms;
  cursor: pointer;
`
