import React, {useRef, useState} from 'react';
import {SettingName, SettingTabName} from "./SettingsParts";
import styled from "styled-components";
import CutButton from "../UIElements/CutButton";

const SettingsBox = styled.div`
  padding: 50px;
  box-sizing: border-box;
`

const SettingsAppearance = () => {
    const fileRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSelectBackground = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    }

    return (
        <React.Fragment>
            <SettingTabName>Appearance</SettingTabName>

            <SettingsBox>
                <SettingName>Background</SettingName>
                <CutButton onClick={() => fileRef.current.click()}>Select</CutButton>
                <input ref={fileRef} type={"file"} accept={"image/*"} style={{display: 'none'}}/>

            </SettingsBox>
        </React.Fragment>
    );
};

export default SettingsAppearance;