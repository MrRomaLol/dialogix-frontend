import React, {useEffect, useState} from 'react';
import ModalComponent from "./ModalComponent";
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera, faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";
import CropImageModal from "./CropImageModal";
import {ModalName, ModalSubName} from "./ModalsElements";
import CutButton from "../UIElements/CutButton";
import {useDropzone} from "react-dropzone";
import {Store} from "react-notifications-component";
import {useDispatch, useSelector} from "react-redux";
import {createGuild} from "../../store/guildsSlice";
import DXSpinner from "../DXSpinner";

const Content = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px 60px 30px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(61, 38, 84, 0.3);
`

const SectionName = styled.div`
  font-size: 20px;
  color: white;
  margin-top: 10px;
  margin-bottom: 5px;
  font-family: "JetBrains Mono", serif;
  align-self: stretch;
`

const Input = styled.input`
  background-color: rgba(29, 5, 52, 0.3);
  border: solid rgba(188, 44, 201, 0.62) 2px;
  color: white;
  width: 400px;
  font-size: 20px;
  font-family: "JetBrains Mono", serif;

  &:focus, &:focus {
    outline: none;
  }
`

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  margin-bottom: 40px;
  transition: filter 200ms;
  box-sizing: border-box;

  &:hover {
    filter: brightness(60%);
  }
`

const Outline = styled(ImageContainer)`
  border: dashed white 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AvatarImage = styled(ImageContainer)`
  background-size: cover;
  background-position: center;
`

const Icon = styled(FontAwesomeIcon)`
  font-size: 40px;
  color: white;
`

const NoImage = ({icon}) => {
    return <Outline>
        <Icon icon={icon}/>
    </Outline>
}

const ServerImage = ({onChange}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isCropModalOpened, setIsCropModalOpened] = useState(false);

    const handleOpenCropModal = () => {
        setIsCropModalOpened(true);
    }

    const handleCloseCropModal = () => {
        setIsCropModalOpened(false);
    }

    const readAndCropImage = (imageFile) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };
        reader.readAsDataURL(imageFile);
        handleOpenCropModal();
    }

    const handleImageCrop = (image) => {
        setSelectedImage(image);
        onChange(image);
    }

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles) {
            readAndCropImage(acceptedFiles[0]);
        }
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: false,
        maxFiles: 1,
        accept: {
            "image/*": [],
        }
    });

    return (
        <div>
            <label {...getRootProps()}
                   htmlFor={"fileInput"}>
                {selectedImage ?
                    <AvatarImage style={{backgroundImage: `url(${selectedImage})`}}/> :
                    <NoImage icon={isDragActive ? faCloudArrowUp : faCamera}/>}
            </label>
            <input {...getInputProps()}/>
            <CropImageModal isOpen={isCropModalOpened} src={selectedImage} onRequestClose={handleCloseCropModal}
                            onImageCrop={handleImageCrop}/>
        </div>
    )
}


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
                message: "Guild name is too short"
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
                <Content>
                    <ModalName>Create guild</ModalName>
                    <ModalSubName style={{marginTop: "10px"}}>Create guild</ModalSubName>
                    <SectionName>Guild name</SectionName>
                    <Input style={{marginBottom: "10px"}} name={'guildName'} onChange={handleChange}/>
                    <SectionName>Upload image</SectionName>
                    <ServerImage onChange={handleAvatarChange}/>
                    <CutButton onClick={handleServerCreate}>{createLoading ? <DXSpinner/> : 'Create'}</CutButton>
                </Content>
            </ContentContainer>
        </ModalComponent>
    );
};

export default CreateGuildModal;