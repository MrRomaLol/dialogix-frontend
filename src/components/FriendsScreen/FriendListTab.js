import React from 'react';
import {Grid} from "./StyledParts";
import FriendCard from "./FriendCard";

const FriendListTab = () => {
    return (
        <Grid className={"scroll-bar"}>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
            <FriendCard nick={"friend"}/>
        </Grid>
    );
};

export default FriendListTab;