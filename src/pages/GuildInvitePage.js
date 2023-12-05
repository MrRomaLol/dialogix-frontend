import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import ContentContainer from "../components/ContentContainer";
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import ElectronHeader from "../components/ElectronHeader";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import FriendAvatar from "../components/FriendAvatar";
import {ModalSubName} from "../components/Modals/ModalParts";
import {ServerIcon} from "../components/Bars/ServerBarIcon";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useQuery from "../hooks/useQuery";
import {acceptGuildInvite, setCurrentGuild} from "../store/guildsSlice";
import {setChat} from "../store/chatSlice";
import {getData} from "../axios";
import DXSpinner from "../components/DXSpinner";
import {Store} from "react-notifications-component";

const StyledAppContent = styled(AppContent)`
  position: relative;
  justify-content: center;
  align-items: center;
`

const UserAvatar = styled(FriendAvatar)`
  width: 72px;
  height: 72px;
  margin-bottom: 20px;
`

const GuildAvatar = styled(ServerIcon)`
  width: 72px;
  height: 72px;
  margin-right: 20px;
`

const ButtonBack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  cursor: pointer;
  transition-duration: 200ms;
`

const ButtonsIcon = styled(FontAwesomeIcon)`
  width: 36px;
  height: 36px;
  color: white;
`

const AcceptBack = styled(ButtonBack)`
  background-color: #6F2DA8;

  &:hover {
    background-color: #561a85;
  }
`

const RejectBack = styled(ButtonBack)`
  background-color: #B13470;

  &:hover {
    background-color: #881b50;
  }
`

const GuildInfo = ({id, url, name}) => {
    return (
        <div style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px"
        }}>
            <GuildAvatar id={id} url={url} name={name}/>
            <ModalSubName>{name}</ModalSubName>
        </div>
    )
}

const GuildButtons = ({onAccept, onReject, isLoading}) => {
    return (
        <div style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
            gap: "160px"
        }}>
            <AcceptBack onClick={onAccept}>
                {isLoading ? <DXSpinner/> : <ButtonsIcon icon={faCheck}/>}
            </AcceptBack>
            <RejectBack onClick={onReject}>
                <ButtonsIcon icon={faXmark}/>
            </RejectBack>
        </div>
    )
}

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const query = useQuery();

    const [isLoading, setIsLoading] = useState(true);
    const [inviteInfo, setInviteInfo] = useState(null);

    const {currentGuildId, loading} = useSelector(state => state.guilds);
    const {currentChatId} = useSelector(state => state.chat);

    const [guildId] = useState(currentGuildId);
    const [chatId] = useState(currentChatId);

    const goToApp = () => {
        if (loading) return;
        if (guildId) {
            dispatch(setCurrentGuild({currentGuildId: guildId}));
        }
        if (chatId) {
            dispatch(setChat({chatId}));
        }
        navigate('/app');
    }

    const notification = {
        title: "Error!",
        type: "danger",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeInDown"],
        dismiss: {
            duration: 5000,
            pauseOnHover: true,
        }
    }

    const acceptInvite = () => {
        if (loading) return;
        dispatch(acceptGuildInvite({linkId: query.get("id")})).unwrap()
            .then(() => {
                goToApp();
            })
            .catch((error) => {
                Store.addNotification({
                    ...notification,
                    message: `Something went wrong: ${error}`
                })
            })
    }

    let content;

    if (isLoading) {
        content = <div style={{width: "100px", height: "100px"}}><DXSpinner/></div>;
    } else if (inviteInfo.status) {
        content = <>
            <ModalSubName>{inviteInfo.status === 'you_not_invited' ? "You are not invited to this guild" : `Someting went wrong: ${inviteInfo.status}`}</ModalSubName>
            <RejectBack style={{marginTop: "20px"}} onClick={goToApp}>
                <ButtonsIcon icon={faXmark}/>
            </RejectBack>
        </>
    } else {
        content = <>
            <UserAvatar id={inviteInfo.user.id} url={inviteInfo.user.avatar_url} nick={inviteInfo.user.nickname}/>
            <ModalSubName>{inviteInfo.user.nickname} invited you to the guild</ModalSubName>
            <GuildInfo id={inviteInfo.guild.id} url={inviteInfo.guild.avatar_url} name={inviteInfo.guild.name}/>
            <ModalSubName>Accept?</ModalSubName>
            <GuildButtons onAccept={acceptInvite} onReject={goToApp} isLoading={loading}/>
        </>
    }

    useEffect(() => {
        const getInfo = async () => {
            const id = query.get("id");

            const res = await getData(`/api/v1/guilds/invite?id=${id}`);

            setIsLoading(false);
            if (!res.ok) {
                return setInviteInfo({status: res.message});
            }

            setInviteInfo({user: res.user, guild: res.guild});
        }

        getInfo();
    }, [query])

    return (
        <React.Fragment>
            <AppBackground/>
            <AppContent>
                {window.IS_USING_DIALOGIX_APP && <ElectronHeader/>}
                <StyledAppContent>
                    <ContentContainer>
                        <div style={{
                            padding: "30px 60px 30px 60px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            {content}
                        </div>
                    </ContentContainer>
                </StyledAppContent>
            </AppContent>
        </React.Fragment>
    );
};

export default LoginPage;