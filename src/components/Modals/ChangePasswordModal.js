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
import {t} from "i18next";
import {cT} from "../../localization/funcs";


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
        title: t("misc.error"),
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
                message: t("chngPswdModal.entCurrPswd")
            });
        }

        if (formData.newPassword !== formData.repeat) {
            return Store.addNotification({
                ...notification,
                message: t("logRegPage.pswdNotMatch")
            });
        }

        if (formData.newPassword.length < 6) {
            return Store.addNotification({
                ...notification,
                message: t("logRegPage.shortPswd")
            })
        }

        if (formData.currentPassword === formData.newPassword) {
            return Store.addNotification({
                ...notification,
                message: t("chngPswdModal.samePswd")
            })
        }

        dispatch(changePassword({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
        })).unwrap()
            .then(() => {
                Store.addNotification({
                    ...notification,
                    title: t("misc.succ"),
                    type: "success",
                    message: t("chngPswdModal.succChangePswd")
                })
                onRequestClose();
            })
            .catch((error) => {
                Store.addNotification({
                    ...notification,
                    message: error === 'wrong_password' ? t("chngPswdModal.currPswdIncor") :  cT(t("misc.msgErr"), error)
                })
            })
    }

    return (
        <ModalComponent isOpen={isOpen} onRequestClose={onRequestClose}>
            <ContentContainer>
                <ModalContent>
                    <ModalName></ModalName>
                    <ModalSubName style={{marginTop: "10px"}}>{t("chngPswdModal.entCurrAndNewPswd")}</ModalSubName>
                    <SectionName style={{marginTop: "30px"}}>{t("chngPswdModal.currPswd")}</SectionName>
                    <StyledInputBox type={'password'} name={'currentPassword'} onChange={handleChange}/>
                    <SectionName>{t("chngPswdModal.newPswd")}</SectionName>
                    <StyledInputBox type={'password'} name={'newPassword'} onChange={handleChange}/>
                    <SectionName>{t("chngPswdModal.repNewPswd")}</SectionName>
                    <StyledInputBox type={'password'} name={'repeat'} onChange={handleChange}/>
                    <CutButton style={{marginTop: "20px"}} onClick={handleChangePassword}>{loading ?
                        <DXSpinner/> : t("misc.done")}</CutButton>
                </ModalContent>
            </ContentContainer>
        </ModalComponent>
    );
};

export default ChangePasswordModal;