import React from 'react';
import styled from "styled-components";
import ContentContainer from "../ContentContainer";
import ChatScreen from "../ChatScreen";

const GuildLeftBar = styled(ContentContainer)`  
  height: 100%;
  width: 250px;
`

const GuildChat = styled(ContentContainer)`
  display: flex;
  flex: 1;
  margin: 0 20px;
  
  height: 100%;
`

const GuildRightBar = styled(ContentContainer)`
  height: 100%;
  width: 250px;
`

const GuildScreen = () => {
    return (
        <div style={{display:"flex", width:"100%", height:"100%"}}>
            <GuildLeftBar></GuildLeftBar>
            <GuildChat></GuildChat>
            <GuildRightBar/>
        </div>
    );
};

export default GuildScreen;