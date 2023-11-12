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
    const {loading: createLoading, error: createError} = useSelector(state => state.guilds);
    const [isTryingToCreate, setIsTryingToCreate] = useState(false);
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

    const handleServerCreate = () => {
        if (createLoading) return;
        setIsTryingToCreate(false);
        if (formData.guildName.length < 2) {
            return Store.addNotification({
                ...notification,

            })
        }

        if (formData.guildName.length > 25) {
            return Store.addNotification({
                ...notification,
                message: "Guild name is too long"
            })
        }

        dispatch(createGuild(formData));
        setIsTryingToCreate(true);
    }

    useEffect(() => {
        const handleCreate = () => {
            if (!isTryingToCreate) return;

            if (!createLoading) {
                return onRequestClose();
            }

            if (createError) {
                return Store.addNotification({
                    ...notification,
                    message: `Guild creation failed: ${createError}`
                });
            }

        }

        handleCreate();
    }, [isTryingToCreate, createLoading, createError])

    return (
        <ModalComponent isOpen={isOpen} onRequestClose={onRequestClose}>
            <ContentContainer>
                <ModalContent>
                    <ModalName>Create guild</ModalName>
                    <ModalSubName style={{marginTop: "10px"}}>Create guild</ModalSubName>
                    <SectionName>Guild name</SectionName>
                    <StyledInputBox name={'guildName'} onChange={handleChange}/>
                    <SectionName>Upload image</SectionName>
                    <GuildImageSelector onChange={handleAvatarChange}/>
                    <CutButton onClick={handleServerCreate}>{createLoading ? <DXSpinner/> : 'Create'}</CutButton>
                </ModalContent>
            </ContentContainer>
        </ModalComponent>
    );
};

export default CreateGuildModal;