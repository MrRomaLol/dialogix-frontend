import React from 'react';
import {Grid} from "./StyledParts";
import styled from "styled-components";
import FriendCard from "./FriendCard";

const SeparatorContainer = styled.div`
  height: 50px;
  width: 100%;

  margin-top: 5px;
  margin-bottom: 5px;

  color: white;
  font-size: 24px;

  filter: drop-shadow(#FC03F2 0px 0px 3px);

  grid-column-start: 1;
  grid-column-end: -1;
`

const Separator = styled.div`
  height: 3px;

  box-sizing: border-box;

  margin-left: 20px;
  margin-right: 20px;

  background-color: #8723D6;

  align-self: center;
`

const Name = styled.div`
  color: #FC03F2;
  font-family: Furore, serif;
  
  margin-left: 50px;
  margin-bottom: 10px;
`

const FriendSentPendingTab = () => {
    return (
        <Grid className={"scroll-bar"}>
            <SeparatorContainer>
                <Name>Pending</Name>
                <Separator/>
            </SeparatorContainer>

            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>

            <SeparatorContainer>
                <Name>Sent</Name>
                <Separator/>
            </SeparatorContainer>

            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
        </Grid>
    );
};

export default FriendSentPendingTab;