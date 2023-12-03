import React, {useEffect, useState} from 'react';
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import ModalComponent from "./ModalComponent";
import InputBox from "../UIElements/InputBox";
import {ModalContent, ModalName, ModalSubName, SectionName} from "./ModalParts";
import CutButton from "../UIElements/CutButton";
import {Store} from "react-notifications-component";
import {useDispatch, useSelector} from "react-redux";
import {changePassword} from "../../store/authSlice";
import DXSpinner from "../DXSpinner";


const StyledInputBox = styled(InputBox)`
  margin-bottom: 10px;
  font-size: 20px;
  padding: 2px;
  width: 100%;
`

const ChangePasswordModal = ({isOpen, onRequestClose}) => {
    const dispatch = useDispatch();
    const {loading} = useSelector(store => store.auth);

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        repeat: ''
    })

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
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

    const handleChangePassword = () => {
        if (loading) return;
        if (!formData.currentPassword) {
            return Store.addNotification({
                ...notification,
                message: "Enter your current password"
            });
        }

        if (formData.newPassword !== formData.repeat) {
            return Store.addNotification({
                ...notification,
                message: "Passwords doesn't match"
            });
        }

        if (formData.newPassword.length < 6) {
            return Store.addNotification({
                ...notification,
                message: "Password is too short"
            })
        }

        if (formData.currentPassword === formData.newPassword) {
            return Store.addNotification({
                ...notification,
                message: "And what will you achieve by this?"
            })
        }

        dispatch(changePassword({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
        })).unwrap()
            .then(() => {
                Store.addNotification({
                    ...notification,
                    title: "Success!",
                    type: "success",
                    message: "Password changed successfully"
                })
                onRequestClose();
            })
            .catch((error) => {
                Store.addNotification({
                    ...notification,
                    message: error === 'wrong_password' ? 'Current password you entered is incorrect' : `Something went wrong: ${error}`
                })
            })
    }

    return (
        <ModalComponent isOpen={isOpen} onRequestClose={onRequestClose}>
            <ContentContainer>
                <ModalContent>
                    <ModalName>Change password</ModalName>
                    <ModalSubName style={{marginTop: "10px"}}>Enter your current password and a new
                        password</ModalSubName>
                    <SectionName style={{marginTop: "30px"}}>Current password</SectionName>
                    <StyledInputBox type={'password'} name={'currentPassword'} onChange={handleChange}/>
                    <SectionName>New password</SectionName>
                    <StyledInputBox type={'password'} name={'newPassword'} onChange={handleChange}/>
                    <SectionName>Repeat new password</SectionName>
                    <StyledInputBox type={'password'} name={'repeat'} onChange={handleChange}/>
                    <CutButton style={{marginTop: "20px"}} onClick={handleChangePassword}>{loading ?
                        <DXSpinner/> : 'Done'}</CutButton>
                </ModalContent>
            </ContentContainer>
        </ModalComponent>
    );
};

export default ChangePasswordModal;