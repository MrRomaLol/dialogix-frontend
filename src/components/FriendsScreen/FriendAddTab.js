import React from 'react';
import styled from "styled-components";

const SearchField = styled.div`
  width: 100%;
  height: 70px;
  padding: 16px;
  border: 2px solid rgba(188, 44, 201, 0.62);
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`

const FriendSearchInput = styled.input`
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

const Button = styled.button`
  width: 200px;

  color: white;

  background-color: purple;
`

const FriendAddTab = () => {
    return (
        <div style={{boxSizing: "border-box", padding: "20px"}}>
            <SearchField>
                <FriendSearchInput/>
                <Button>Send friend request</Button>
            </SearchField>
        </div>
    );
};

export default FriendAddTab;