import React, {useEffect, useMemo, useState} from 'react';
import {SettingTabName} from "./SettingsParts";
import styled from "styled-components";
import CutButton from "../UIElements/CutButton";
import ContentContainer from "../ContentContainer";
import ImageSelector from "../UIElements/ImageSelector";
import InputBox from "../UIElements/InputBox";
import ChangePasswordModal from "../Modals/ChangePasswordModal";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "react-notifications-component";
import {updateProfile} from "../../store/authSlice";
import DxSpinner from "../DXSpinner";

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

const UserPreviewContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
`

const UserPreviewBox = styled(ContentContainer)`
  min-width: 460px;
`

const ProfileButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  transition-duration: 200ms;

  opacity: ${({isShown}) => isShown ? 1 : 0};
`

const Setting = ({name, onChange, value, maxLength, disabled}) => {
    return <div style={{marginBottom: '40px'}}>
        <SettingName>{name}</SettingName>
        <StyledInputBox value={value} placeholder={name} disabled={disabled} maxLength={maxLength}
                        name={name.toLowerCase()}
                        onChange={onChange}/>
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

function areSpecifiedFieldsEqual(obj1, obj2, fieldsToCheck) {
    for (const key of fieldsToCheck) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

const MyAccount = () => {
    const dispatch = useDispatch();
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const {userInfo, loading} = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        avatar_url: userInfo.avatar_url,
        nickname: userInfo.nickname
    });

    const isValuesChanged = useMemo(() => {
        return !areSpecifiedFieldsEqual(formData, userInfo, ['avatar_url', 'nickname'])
    }, [formData, userInfo])

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleAvatarChange = (image) => {
        setFormData(prev => ({
            ...prev,
            avatar_url: image
        }))
    }

    const handleReset = () => {
        setFormData({
            avatar_url: userInfo.avatar_url,
            nickname: userInfo.nickname,
        })
    }

    const updateInfo = (data) => {
        setFormData(data)
    }

    const openChangePasswordModal = () => {
        setIsChangePasswordOpen(true);
    }

    const closeChangePasswordModal = () => {
        setIsChangePasswordOpen(false);
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

    const handleUpdateProfile = () => {
        if (loading) return;
        if (!formData.nickname) {
            return Store.addNotification({
                ...notification,
                message: "Invalid nickname"
            })
        }

        const data = {
            avatar: formData.avatar_url !== userInfo.avatar_url ? formData.avatar_url : null,
            nickname: formData.nickname,
        }

        dispatch(updateProfile(data)).unwrap()
            .then((result) => {
                updateInfo(result);
                Store.addNotification({
                    ...notification,
                    title: "Success!",
                    type: "success",
                    message: "Profile updated successfully!"
                })
            })
            .catch((error) => {
                Store.addNotification({
                    ...notification,
                    message: `Something went wrong: ${error}`
                })
            });
    }

    return (
        <React.Fragment>
            <SettingTabName>My Account</SettingTabName>

            <SettingsBox>

                <ChangeSettingsBox>
                    <Setting name={'Nickname'} onChange={handleChange} value={formData.nickname} maxLength={20}/>
                    <Setting name={'Username'} value={userInfo.username} disabled/>
                    <Setting name={'Email'} value={userInfo.email} disabled/>
                    <PasswordChange onClick={openChangePasswordModal}/>
                </ChangeSettingsBox>

                <UserPreviewContainer>
                    <UserPreviewBox backgroundColor={"rgba(0, 0, 0, 0.5)"}>
                        <UserTagBox>
                            <AvatarImageSelector onChange={handleAvatarChange}/>
                            <UsernameNickname nickname={formData.nickname} username={userInfo.username}/>
                        </UserTagBox>
                    </UserPreviewBox>
                    <ProfileButtonsContainer isShown={isValuesChanged}>
                        <CutButton style={{marginTop: "20px"}} onClick={handleReset}>Reset</CutButton>
                        <CutButton style={{marginTop: "20px"}} onClick={handleUpdateProfile}>{loading ?
                            <DxSpinner/> : "Apply"}</CutButton>
                    </ProfileButtonsContainer>
                </UserPreviewContainer>


            </SettingsBox>

            <ChangePasswordModal isOpen={isChangePasswordOpen} onRequestClose={closeChangePasswordModal}/>

        </React.Fragment>
    );
};

export default MyAccount;