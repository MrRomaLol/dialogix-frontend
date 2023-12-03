import React, {useEffect, useState} from 'react';
import ModalComponent from "./ModalComponent";
import ContentContainer from "../ContentContainer";
import styled, {css} from "styled-components";
import CutButton from "../UIElements/CutButton";
import {useDispatch, useSelector} from "react-redux";
import {ModalContent, ModalName, SectionName} from "./ModalParts";
import InputBox from "../UIElements/InputBox";
import ListSelect from "../ListSelect";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faVolumeHigh} from "@fortawesome/free-solid-svg-icons";
import DXSpinner from "../DXSpinner";
import {Store} from "react-notifications-component";
import {createChannel} from "../../store/guildsSlice";

const StyledInputBox = styled(InputBox)`
  margin-bottom: 10px;
  font-size: 20px;
  width: 350px;
  padding: 2px;
`

const ChanelTypeBack = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  font-family: "JetBrains Mono", serif;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.2);
  transition-duration: 200ms;
  cursor: pointer;

  ${({isSelected}) => isSelected && css`
    background-color: rgba(188, 44, 201, 0.3);
    cursor: default;
  `}
  &:hover {
    ${({isSelected}) => !isSelected && css`
      background-color: rgba(188, 44, 201, 0.1);
    `}
  }
`

const ChanelType = ({icon, name, isSelected = false, onClick}) => {
    return (
        <ChanelTypeBack onClick={onClick} isSelected={isSelected}>
            <div style={{display: "inherit", alignItems: "inherit"}}>
                <FontAwesomeIcon icon={icon} style={{height: "30px", marginRight: "15px"}}/>
                <p>{name}</p>
            </div>
            <input type={"radio"} checked={isSelected} readOnly/>
        </ChanelTypeBack>
    )
}

const CreateCategoryModal = ({isOpen, onRequestClose, category}) => {
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.guilds);
    const [formData, setFormData] = useState({
        channelName: '',
        channelType: 'text',
    })

    const chanelTypes = [
        {item: <ChanelType icon={faComments} name={'Text'}/>, selected: true, name: 'text'},
        {item: <ChanelType icon={faVolumeHigh} name={'Voice'}/>, selected: false, name: 'voice'}
    ]

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

    const handleChanelCreate = () => {
        if (loading) return;
        if (formData.channelName.length < 3) {
            return Store.addNotification({
                ...notification,
                message: "Channel name is too short"
            })
        }

        if (formData.channelName.length > 16) {
            return Store.addNotification({
                ...notification,
                message: "Channel name is too long"
            })
        }

        dispatch(createChannel({
            channelName: formData.channelName,
            channelType: formData.channelType,
            categoryId: category?.id,
        })).unwrap()
            .then(() => {
                onRequestClose();
            })
            .catch((error) => {
                Store.addNotification({
                    ...notification,
                    message: `Something went wrong: ${error}`
                })
            })
    }

    useEffect(() => {
        if (isOpen) {
            setFormData({
                channelName: '',
                channelType: 'text',
            })
        }
    }, [isOpen]);

    return (
        <ModalComponent isOpen={isOpen} onRequestClose={onRequestClose}>
            <ContentContainer>
                <ModalContent>
                    <ModalName>Create channel {category && `in ${category.name}`}</ModalName>
                    <SectionName>Channel name</SectionName>
                    <StyledInputBox autoFocus name={'channelName'} onChange={handleChange}/>
                    <SectionName>Channel type</SectionName>
                    <ListSelect name={'channelType'} onChange={handleChange} items={chanelTypes}/>
                    <CutButton style={{marginTop: "15px"}} onClick={handleChanelCreate}>{loading ?
                        <DXSpinner/> : 'Create'}</CutButton>
                </ModalContent>
            </ContentContainer>
        </ModalComponent>
    );
};

export default CreateCategoryModal;