import React, {useEffect, useMemo} from 'react';
import styled from "styled-components";
import ContentContainer from "../ContentContainer";
import useWindowSize from "../../hooks/useWindowSize";
import {useDispatch, useSelector} from "react-redux";
import {loadGuild, setCurrentGuild} from "../../store/guildsSlice";
import ChannelsBar from "./ChannelsBar";
import UsersBar from "./UsersBar";
import {MAIN_SCREEN, setScreen} from "../../store/screenStateSlice";

const GuildChat = styled(ContentContainer)`
  display: flex;
  flex: 1;
  margin: 0 20px;

  height: 100%;
`

const GuildScreen = () => {
    const {width} = useWindowSize();
    const dispatch = useDispatch();

    const {guilds, currentGuildId} = useSelector(state => state.guilds);

    const guild = useMemo(() => {
        const guildIndex = guilds.findIndex(item => item.id === currentGuildId);
        return guilds[guildIndex];
    }, [guilds, currentGuildId])

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

            {width > 1200 && <UsersBar guild={guild}/>}
        </div>
    );
};

export default GuildScreen;