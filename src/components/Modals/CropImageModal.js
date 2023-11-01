import React, {useEffect, useState} from "react";
import ModalComponent from "./ModalComponent";
import ContentContainer from "../ContentContainer";
import Cropper from "react-easy-crop";
import styled from "styled-components";
import {ModalName} from "./ModalsElements";
import CutButton from "../UIElements/CutButton";
import {createCroppedImage} from "../../utils/imageCrop";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 25px;
  box-sizing: border-box;
`

const CropContainer = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 1 / 1;
`

const ImagePlaceholder = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 10px;
  justify-content: space-between;
`

const Slider = styled.input`
  width: 100%;
  margin-right: 15px;
`

const CropImageModal = ({isOpen, onRequestClose, src, onImageCrop}) => {
    const [isAnimationEnd, setIsAnimationEnd] = useState(false);
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [zoom, setZoom] = useState(1);

    const handleChangeZoom = e => {
        setZoom(e.target.value);
    }

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const handleCropImage = async () => {
        const croppedImage = await createCroppedImage(src, croppedAreaPixels);
        onImageCrop?.(croppedImage);
        onRequestClose();
    }

    useEffect(() => {
        let timeout;
        if (isOpen) {
            timeout = setTimeout(() => {
                setIsAnimationEnd(true);
            }, 500)
        } else {
            setIsAnimationEnd(false);
            setCroppedAreaPixels({x: 0, y: 0});
            setZoom(1);
        }

        return () => clearTimeout(timeout);
    }, [isOpen])

    return (
        <ModalComponent isOpen={isOpen} onRequestClose={onRequestClose} width={500} height={620}>
            <ContentContainer>
                <Container>
                    <ModalName style={{marginBottom: "15px"}}>Crop image</ModalName>
                    <CropContainer>
                        {isAnimationEnd ? <Cropper
                            image={src}
                            cropShape={'round'}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            minZoom={1}
                            maxZoom={10}
                            onCropComplete={onCropComplete}
                        /> : <ImagePlaceholder src={src}/>}
                    </CropContainer>
                    <ButtonsContainer>
                        <Slider type={'range'} onChange={handleChangeZoom} min={1} max={10} step={0.1} value={zoom}/>
                        <CutButton width={140} onClick={handleCropImage}>Crop</CutButton>
                    </ButtonsContainer>
                </Container>
            </ContentContainer>
        </ModalComponent>
    );
};

export default CropImageModal;