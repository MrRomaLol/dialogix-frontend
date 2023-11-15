import React, {useMemo} from 'react';
import {Grid} from "./StyledParts";
import FriendCard from "./FriendCard";
import {useSelector} from "react-redux";

const FriendListTab = ({searchQuery}) => {
    const {friends} = useSelector((state) => state.friends);

    const filteredFriends = useMemo(() => {
        return friends.filter(item => {
            return item.nickname.toLowerCase().includes(searchQuery.toLowerCase())
        })
    }, [friends, searchQuery]);

    return (
        <Grid className={"scroll-bar"}>
            {filteredFriends.map((friend) => (
                <FriendCard key={friend.id} nick={friend.nickname} id={friend.id} avatarUrl={friend.avatar_url}
                            status={friend.status}/>))}
        </Grid>
    );
};

export default FriendListTab;