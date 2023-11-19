import React from "react";
import {IconFriendGuild} from "./Bars/SideIconParts";
import styled from "styled-components";

const AvatarIcon = styled(IconFriendGuild)`
  position: relative;
`

const UserAvatar = ({id, url, nick, children, className}) => {
    return (
        url ?
            <AvatarIcon className={className} style={{backgroundImage: `url(api/v1/cdn/users/${id}/${url})`}}>{children}</AvatarIcon> :
            <AvatarIcon className={className}>{nick.substring(0, 1)}{children}</AvatarIcon>
    )
}

export default UserAvatar;