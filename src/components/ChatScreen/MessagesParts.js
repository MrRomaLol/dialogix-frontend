import styled from "styled-components";

export const MessageContainer = styled.div`
  display: flex;
  width: 100%;

  flex-direction: row;

  box-sizing: border-box;
  padding: 20px 20px 10px;
`

export const MessageStampContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const MessageNick = styled.p`
  color: white;
  font-family: JetBrains Mono, serif;
  font-size: 16px;
  margin: 2px;
`

export const MessageDate = styled.p`
  color: gray;
  font-family: JetBrains Mono, serif;
  font-size: 12px;
  margin: 2px;
`

export const MessageBack = styled.div`
  display: flex;
  flex-direction: column;
  color: white;

  background-color: rgba(121, 65, 142, 0.48);
  padding: 10px 20px;

  word-wrap: anywhere;
  
  font-family: "JetBrains Mono", serif;
`

export const Avatar = styled.div`
  width: 50px;
  min-width: 50px;  
  height: 50px;
  
  border-radius: 50%;
  background-color: #bbbbbe;
`