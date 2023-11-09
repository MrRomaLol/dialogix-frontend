import React, {useState} from 'react';
import {SettingTabName} from "./SettingsParts";
import styled from "styled-components";
import CutButton from "../UIElements/CutButton";
import ContentContainer from "../ContentContainer";
import ImageSelector from "../UIElements/ImageSelector";
import InputBox from "../UIElements/InputBox";
import ChangePasswordModal from "../Modals/ChangePasswordModal";

const SettingsBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: flex-start;
  padding: 50px;

  box-sizing: border-box;

  @media (max-width: 1350px) {
    flex-direction: column-reverse;
    align-items: center;
    padding: 10px;
  }
`

const ChangeSettingsBox = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
`

const UserTagBox = styled.div`
  padding: 20px 50px;

  display: flex;
  flex-direction: row;
`

const SettingName = styled.p`
  font-size: 25px;
  font-family: Furore, serif;
  text-indent: 15px;

  margin-bottom: 10px;
  color: white;
`

const StyledInputBox = styled(InputBox)`
  margin-bottom: 10px;
  font-size: 25px;
  width: 350px;
  padding: 10px;
`


const Setting = ({name}) => {
    return <div style={{marginBottom: '40px'}}>
        <SettingName>{name}</SettingName>
        <StyledInputBox placeholder={name}/>
    </div>
}


const PasswordChange = ({onClick}) => {
    return (
        <>
            <SettingName> Password </SettingName>
            <CutButton style={{marginTop: "25px"}} width={300} onClick={onClick}>Change Password</CutButton>
        </>
    )
}

const UserNickName = styled.p`
  font-family: JetBrains Mono, serif;
  font-size: 18px;
  color: #A684DF;
  margin-top: 5px;
  margin-bottom: 5px;
`

const UsernameNickname = ({nickname, username}) => {
    return <div style={{display: "flex", flexDirection: "column", alignSelf: "center"}}>
        <UserNickName>{nickname}</UserNickName>
        <UserNickName>{username}</UserNickName>
    </div>;
}

const AvatarImageSelector = styled(ImageSelector)`
  margin-right: 40px;
`

const MyAccount = () => {
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    const handleAvatarChange = (image) => {

    }

    const openChangePasswordModal = () => {
        setIsChangePasswordOpen(true);
    }

    const closeChangePasswordModal = () => {
        setIsChangePasswordOpen(false);
    }

    return (
        <React.Fragment>
            <SettingTabName>My Account</SettingTabName>

            <SettingsBox>

                <ChangeSettingsBox>
                    <Setting name={'Nickname'}/>
                    <Setting name={'Username'}/>
                    <Setting name={'Email'}/>
                    <PasswordChange onClick={openChangePasswordModal}/>
                </ChangeSettingsBox>

                <UserTagBox>
                    <ContentContainer backgroundColor={"rgba(0, 0, 0, 0.5)"}>
                        <UserTagBox>
                            <AvatarImageSelector onChange={handleAvatarChange}/>
                            <UsernameNickname username={'Username'} nickname={'Nickname'}/>
                        </UserTagBox>
                    </ContentContainer>
                </UserTagBox>

            </SettingsBox>

            <ChangePasswordModal isOpen={isChangePasswordOpen} onRequestClose={closeChangePasswordModal}/>

        </React.Fragment>
    );
};

export default MyAccount;