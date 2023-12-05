import React, {useEffect, useState} from 'react';
import ModalComponent from "./ModalComponent";
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import CutButton from "../UIElements/CutButton";
import {Store} from "react-notifications-component";
import {useDispatch, useSelector} from "react-redux";
import {createGuild} from "../../store/guildsSlice";
import DXSpinner from "../DXSpinner";
import ImageSelector from "../UIElements/ImageSelector";
import {ModalContent, ModalName, ModalSubName, SectionName} from "./ModalParts";
import InputBox from "../UIElements/InputBox";
import {useTranslation} from "react-i18next";
import {cT} from "../../localization/funcs";

const StyledInputBox = styled(InputBox)`
  margin-bottom: 10px;
  font-size: 20px;
  width: 350px;
  padding: 2px;
`

const GuildImageSelector = styled(ImageSelector)`
  padding-bottom: 40px;
`

const CreateGuildModal = ({isOpen, onRequestClose}) => {
    const dispatch = useDispatch();
    const [ t, i18n ] = useTranslation();
    const {loading} = useSelector(state => state.guilds);
    const [formData, setFormData] = useState({
        guildName: '',
        avatar: null,
    })

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleAvatarChange = (image) => {
        setFormData(prev => ({
            ...prev,
            avatar: image
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

    const handleServerCreate = () => {

        if (formData.guildName.length < 2) {
            return Store.addNotification({
                ...notification,
                message: t("guildModal.shortGuildName")
            })
        }

        if (formData.guildName.length > 25) {
            return Store.addNotification({
                ...notification,
                message: t("guildModal.longGuildName")
            })
        }

        dispatch(createGuild(formData)).unwrap()
            .then(() => {
                onRequestClose();
            })
            .catch((error) => {
                Store.addNotification({
                    ...notification,
                    message:  cT(t("misc.msgErr"), error)
                });
            })
    }

    return (
        <ModalComponent isOpen={isOpen} onRequestClose={onRequestClose}>
            <ContentContainer>
                <ModalContent>
                    <ModalName>{t("guildModal.createGuild")}</ModalName>
                    <ModalSubName style={{marginTop: "10px"}}>{t("guildModal.createGuild")}</ModalSubName>
                    <SectionName>{t("guildModal.guildName")}</SectionName>
                    <StyledInputBox name={'guildName'} onChange={handleChange}/>
                    <SectionName>{t("guildModal.uplImg")}</SectionName>
                    <GuildImageSelector onChange={handleAvatarChange}/>
                    <CutButton onClick={handleServerCreate}>{loading ? <DXSpinner/> : t("misc.create")}</CutButton>
                </ModalContent>
            </ContentContainer>
        </ModalComponent>
    );
};

export default CreateGuildModal;