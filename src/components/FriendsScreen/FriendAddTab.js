import React, {useState} from 'react';
import styled from "styled-components";
import {FriendsInputField} from "./StyledParts";


const SearchField = styled.div`
  width: 100%;
  height: 70px;
  padding: 16px;
  border: 2px solid rgba(188, 44, 201, 0.62);
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`

const Button = styled.button`
  min-width: 200px;

  color: white;
  font-family: JetBrains Mono, serif;;

  background-color: rgb(188, 44, 201);

  &:hover {
    background-color: rgb(162, 35, 173);
  }

  &:active {
    background-color: rgb(118, 10, 126);
  }

  transition-duration: 200ms;

  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 20px) 100%, 0 100%);
  border: none;
`

const FriendAddTab = () => {
    const [friendsName, setFriendsName] = useState('');



    const handleAddChange = e => {
        setFriendsName(e.target.value);
    }

    const addFriend = () => {

    }

    return (
        <div style={{boxSizing: "border-box", padding: "20px"}}>
            <SearchField>
                <FriendsInputField onChange={handleAddChange}/>
                <Button onClick={addFriend}>Send friend request</Button>
            </SearchField>
        </div>
    );
};

export default FriendAddTab;