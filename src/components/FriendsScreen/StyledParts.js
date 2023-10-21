import styled from "styled-components";

export const Grid = styled.div`
  width: 100%;

  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));

  box-sizing: border-box;

  padding-top: 10px;

  border-top: solid rgba(188, 44, 201, 0.62) 2px;

  overflow-y: scroll;
`

export const FriendsInputField = styled.input`
  color: white;
  font-size: 20px;
  font-family: monospace;
  resize: none;
  width: 100%;
  border: 0;
  background-color: transparent;

  margin-left: 10px;
  margin-right: 10px;

  &:focus {
    outline: none;
  }
`