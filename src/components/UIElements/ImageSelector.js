import React, {useEffect, useState} from 'react';
import {useDropzone} from "react-dropzone";
import {faCamera, faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";
import CropImageModal from "../Modals/CropImageModal";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
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

const Image = styled(ImageContainer)`
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

const ImageSelector = ({onChange, className}) => {
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
        <div className={className}>
            <label {...getRootProps()}>
                {selectedImage ?
                    <Image style={{backgroundImage: `url(${selectedImage})`}}/> :
                    <NoImage icon={isDragActive ? faCloudArrowUp : faCamera}/>}
            </label>
            <input {...getInputProps()}/>
            <CropImageModal isOpen={isCropModalOpened} src={selectedImage} onRequestClose={handleCloseCropModal}
                            onImageCrop={handleImageCrop}/>
        </div>
    )
}

export default ImageSelector;