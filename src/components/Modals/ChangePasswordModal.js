import React, {useState} from 'react';
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import ModalComponent from "./ModalComponent";
import InputBox from "../UIElements/InputBox";
import {ModalContent, ModalName, ModalSubName, SectionName} from "./ModalParts";
import CutButton from "../UIElements/CutButton";


const StyledInputBox = styled(InputBox)`
  margin-bottom: 10px;
  font-size: 20px;
  width: 350px;
  padding: 2px;
`

const ChangePasswordModal = ({isOpen, onRequestClose}) => {
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
                    <CutButton style={{marginTop: "20px"}}>Done</CutButton>
                </ModalContent>
            </ContentContainer>
        </ModalComponent>
    );
};

export default ChangePasswordModal;