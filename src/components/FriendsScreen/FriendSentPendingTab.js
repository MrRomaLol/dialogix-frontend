import React, {useMemo} from 'react';
import {Grid} from "./StyledParts";
import styled from "styled-components";
import FriendCard from "./FriendCard";
import {useSelector} from "react-redux";
import FriendCardPending from "./FriendCardPending";
import FriendCardSent from "./FriendCardSent";

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
  
  user-select: none;
`

const FriendSentPendingTab = ({searchQuery}) => {
    const {pending, sent} = useSelector((state) => state.friends);

    const filteredPending = useMemo(() => {
        return pending.filter(item => {
            return item.nickname.toLowerCase().includes(searchQuery.toLowerCase())
        })
    }, [pending, searchQuery]);

    const filteredSent = useMemo(() => {
        return sent.filter(item => {
            return item.nickname.toLowerCase().includes(searchQuery.toLowerCase())
        })
    }, [sent, searchQuery]);

    return (
        <Grid className={"scroll-bar"}>
            {filteredPending.length && <>
                <SeparatorContainer>
                    <Name>Pending</Name>
                    <Separator/>
                </SeparatorContainer>
                {filteredPending.map((friend) => (<FriendCardPending key={friend.id} nick={friend.nickname}/>))}
            </>}

            {filteredSent.length && <>
                <SeparatorContainer>
                    <Name>Sent</Name>
                    <Separator/>
                </SeparatorContainer>
                {filteredSent.map((friend) => (<FriendCardSent key={friend.id} nick={friend.nickname}/>))}
            </>}
        </Grid>
    );
};

export default FriendSentPendingTab;