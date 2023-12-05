import React from 'react';
import styled from "styled-components";
import GuildChannels from "./GuildChannels";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`

const Channels = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-left: 20px;
`

const ChannelsCategoryBack = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #C5C5C5;
  user-select: none;
  font-family: "JetBrains Mono", serif;
  font-size: 20px;
  padding: 4px 10px;
  box-sizing: border-box;
`

const Plus = styled.span`
  cursor: pointer;
  transition-duration: 200ms;

  &:hover {
    color: #fff;
  }
`

const ChannelsCategory = ({id, name, channels, onContextMenu, onPlusClick, onContextMenuChannel, showPlus}) => {
    const context = (e) => {
        e.preventDefault();
        onContextMenu({event: e, id, name, channels});
    }

    const plusClicked = () => {
        onPlusClick({id, name, channels});
    }

    return (
        <Container>
            <ChannelsCategoryBack onContextMenu={context}>
                <div>
                    <span style={{paddingRight: "5px"}}>&#8226;</span>
                    {name}
                </div>
                {showPlus && <Plus onClick={plusClicked}>+</Plus>}
            </ChannelsCategoryBack>
            <Channels>
                {channels.map((channel) => <GuildChannels key={channel.id} id={channel.id} type={channel.channel_type}
                                                          name={channel.name} onContextMenu={onContextMenuChannel}/>)}
            </Channels>
        </Container>
    );
};

export default ChannelsCategory;