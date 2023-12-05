import React, {useMemo, useState} from 'react';
import {GuildBarName} from "./GuildParts";
import InviteToGuildModal from "../Modals/InviteToGuildModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import ContentContainer from "../ContentContainer";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import GuildUser from "./GuildUser";
import DxSpinner from "../DXSpinner";
import {ModalSubName} from "../Modals/ModalParts";
import YesNoModal from "../Modals/YesNoModal";
import {useDispatch, useSelector} from "react-redux";
import {Item, Menu, Separator, useContextMenu} from "react-contexify";
import {kickGuildUser} from "../../store/guildsSlice";
import {useTranslation} from "react-i18next";
import {cT} from "../../localization/funcs";

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

const UsersCategoryName = styled.div`
  font-family: Furore, serif;
  font-size: 26px;
  margin-left: 10px;
  color: ${({color}) => color || 'white'};
  margin-top: 16px;
`

const InviteUsers = ({onClick,t}) => {
    return (
        <InviteUsersBack onClick={onClick}>
            <FontAwesomeIcon icon={faUserPlus} color={"#723AAA"}/>
            <div style={{color: "#9788B1", fontFamily: "Furore, serif"}}>{t("userBar.invUsers")}</div>
        </InviteUsersBack>
    )
}

const GuildUsersPlaceholder = ({t}) => {
    return (
        <SkeletonTheme baseColor="#573166" highlightColor="#9c61b2">
            <UsersCategoryName color={"#4908C8"}>{t("userBar.creator")}</UsersCategoryName>
            <Skeleton width={"100%"} height={60}/>
            <UsersCategoryName color={"#A869D9"}>{t("statusSel.online")}</UsersCategoryName>
            <Skeleton width={"100%"} height={60} style={{marginBottom: "16px"}}/>
            <Skeleton width={"100%"} height={60}/>
            <UsersCategoryName color={"#745E91"}>{t("statusSel.off")}</UsersCategoryName>
            <Skeleton width={"100%"} height={60} style={{marginBottom: "16px"}}/>
            <Skeleton width={"100%"} height={60}/>
        </SkeletonTheme>
    )
}

const UsersBar = ({guild}) => {
    const dispatch = useDispatch();
    const [t, i18n] = useTranslation();

    const [isInviteToGuild, setIsInviteToGuild] = useState(false);

    const {loading} = useSelector(state => state.guilds);
    const {userInfo} = useSelector(state => state.auth);
    const [user, setUser] = useState(null);
    const [yesNoModalOpened, setYesNoModalOpened] = useState(false);

    const ID = "kick";

    const {show} = useContextMenu({
        id: ID,
    });

    const showContextMenu = (event) => {
        if (userInfo.id !== guild.creatorId) return;

        event.stopPropagation();
        show({
            event
        })
    }

    const onContextMenuUser = ({event, id, guildUserId, nickname}) => {
        setUser({id, guildUserId, nickname});
        showContextMenu(event);
    }

    const creatorUser = useMemo(() => {
        if (guild.users)
            return guild.users.find((user) => user.role === 'creator');
    }, [guild.users])

    const onlineUsers = useMemo(() => {
        if (guild.users)
            return guild.users.filter((user) => user.status !== 'offline' && user.role !== 'creator');
    }, [guild.users])

    const offlineUsers = useMemo(() => {
        if (guild.users)
            return guild.users.filter((user) => user.status === 'offline' && user.role !== 'creator');
    }, [guild.users])

    const handleInviteToGuild = () => {
        setIsInviteToGuild(true);
    }

    const closeInviteToGuild = () => {
        setIsInviteToGuild(false);
    }

    const showKick = () => {
        setYesNoModalOpened(true);
    }

    const closeKick = () => {
        setYesNoModalOpened(false);
    }

    const kickUser = () => {
        dispatch(kickGuildUser({memberInGuildId: user.guildUserId, userId: user.id})).unwrap()
            .then(() => {
                closeKick();
            })
    }

    return (
        <>
            <GuildRightBar>
                <GuildBarName>{t("userBar.users")}</GuildBarName>
                <InviteUsers t={t} onClick={handleInviteToGuild}/>
                <Wrapper>
                    <Content className={"scroll-bar"}>

                        {guild.isLoaded ?
                            <>
                                <UsersCategoryName color={"#4908C8"}>{t("userBar.creator")}</UsersCategoryName>
                                <GuildUser guildUserId={creatorUser.guild_user_id} nickname={creatorUser.nickname}
                                           id={creatorUser.user_id} status={creatorUser.status}
                                           avatarUrl={creatorUser.avatar_url}/>

                                {!!onlineUsers.length && <UsersCategoryName color={"#A869D9"}>{t("statusSel.online")}</UsersCategoryName>}
                                {onlineUsers.map((user) => (
                                    <GuildUser key={user.user_id} guildUserId={user.guild_user_id} nickname={user.nickname}
                                               id={user.user_id} status={user.status}
                                               avatarUrl={user.avatar_url} onContextMenu={onContextMenuUser}/>))}

                                {!!offlineUsers.length && <UsersCategoryName color={"#745E91"}>{t("statusSel.off")}</UsersCategoryName>}
                                {offlineUsers.map((user) => (
                                    <GuildUser key={user.user_id} guildUserId={user.guild_user_id} nickname={user.nickname}
                                               id={user.user_id} status={user.status}
                                               avatarUrl={user.avatar_url} onContextMenu={onContextMenuUser}/>))}
                            </> : <GuildUsersPlaceholder t={t}/>}
                    </Content>
                </Wrapper>
            </GuildRightBar>

            <Menu id={ID} animation={'fade'}>
                <Item id="addChannelToCategory" onClick={showKick}>
                    <div style={{color: "#B13470"}}>{cT(t("userBar.kick"), user?.nickname)}</div>
                </Item>
            </Menu>

            <InviteToGuildModal isOpen={isInviteToGuild} onRequestClose={closeInviteToGuild}/>
            <YesNoModal isOpen={yesNoModalOpened} onRequestClose={closeKick}
                        modalName={cT(t("userBar.kick2"), user?.nickname)}
                        firstName={loading ? <DxSpinner/> : t("misc.yes")} secondName={t("misc.no")} onFirst={kickUser}
                        onSecond={closeKick}>
                <ModalSubName>{t("userBar.kickConf")}
                    <span style={{color: "#B13470"}}> {user?.nickname}</span>?</ModalSubName>
            </YesNoModal>
        </>
    );
};

export default UsersBar;