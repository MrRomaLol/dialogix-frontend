import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import ContentContainer from "../ContentContainer";
import useWindowSize from "../../hooks/useWindowSize";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Item, Menu, Separator, useContextMenu} from "react-contexify";
import CreateCategoryModal from "../Modals/CreateCategoryModal";
import CreateChannelModal from "../Modals/CreateChannelModal";
import InviteToGuildModal from "../Modals/InviteToGuildModal";
import ChannelsCategory from "./ChannelsCategory";
import {useDispatch, useSelector} from "react-redux";
import {loadGuild, setCurrentGuild} from "../../store/guildsSlice";
import GuildChannels from "./GuildChannels";
import {GuildBarName} from "./GuildParts";
import ChannelsBar from "./ChannelsBar";
import {APP_OPENED_STATE, APP_SETTINGS_STATE} from "../../store/appStateSlice";

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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const Content = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: auto;
`

const InviteUsersBack = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  padding: 10px 20px;
  user-select: none;
  transition-duration: 200ms;
  cursor: pointer;

  &:hover {
    background-color: rgba(188, 44, 201, 0.1);
  }
`

const InviteUsers = ({onClick}) => {
    return (
        <InviteUsersBack onClick={onClick}>
            <FontAwesomeIcon icon={faUserPlus} color={"#723AAA"}/>
            <div style={{color: "#9788B1", fontFamily: "Furore, serif"}}>Invite users</div>
        </InviteUsersBack>
    )
}

const GuildScreen = () => {
    const {width} = useWindowSize();
    const dispatch = useDispatch();

    const {guilds, currentGuildId} = useSelector(state => state.guilds);

    const [isInviteToGuild, setIsInviteToGuild] = useState(false);

    const guild = useMemo(() => {
        const guildIndex = guilds.findIndex(item => item.id === currentGuildId);
        return guilds[guildIndex];
    }, [guilds, currentGuildId])

    const handleInviteToGuild = () => {
        setIsInviteToGuild(true);
    }

    const closeInviteToGuild = () => {
        setIsInviteToGuild(false);
    }

    useEffect(() => {
        if (!guild.isLoaded) {
            dispatch(loadGuild({guildId: currentGuildId}));
        }
    }, [guilds, currentGuildId]);

    useEffect(() => {
        return () => {
            dispatch(setCurrentGuild({currentGuildId: null}))
        }
    }, []);

    return (
        <div style={{display: "flex", width: "100%", height: "100%"}}>
            <ChannelsBar guild={guild}/>

            <GuildChat>

            </GuildChat>
            {width > 1200 && <GuildRightBar>
                <GuildBarName>Users</GuildBarName>
                <InviteUsers onClick={handleInviteToGuild}/>
                <Wrapper>
                    <Content>
                    </Content>
                </Wrapper>
            </GuildRightBar>}

            <InviteToGuildModal isOpen={isInviteToGuild} onRequestClose={closeInviteToGuild}/>
        </div>
    );
};

export default GuildScreen;