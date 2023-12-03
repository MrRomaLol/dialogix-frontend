import React, {useRef, useState} from 'react';
import {SettingName, SettingTabName} from "./SettingsParts";
import styled from "styled-components";
import CutButton from "../UIElements/CutButton";
import {useDispatch, useSelector} from "react-redux";
import {setAppBackground, updateUserSetting} from "../../store/fetchSlice";
import {Store} from "react-notifications-component";

const SettingsBox = styled.div`
  padding: 50px;
  box-sizing: border-box;
`

const SettingsAppearance = () => {
    const dispatch = useDispatch();
    const {settings} = useSelector(state => state.fetchRoot);
    const fileRef = useRef(null);

    const handleSelectBackground = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 5242880) {
                return Store.addNotification({
                    title: "Error!",
                    type: "danger",
                    insert: "top",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeInDown"],
                    dismiss: {
                        duration: 5000,
                        pauseOnHover: true,
                    },
                    message: "File is too large. Please use file with size maximum of 5MB"
                });
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(setAppBackground({backgroundImage: reader.result}));
            };
            reader.readAsDataURL(selectedFile);
        }
    }

    const handleResetBG = () => {
        const BGSetting = settings['app_bg'];
        dispatch(updateUserSetting({id: BGSetting.id, settingName: 'app_bg', settingValue: ""}));
    }

    return (
        <React.Fragment>
            <SettingTabName>Appearance</SettingTabName>

            <SettingsBox>
                <SettingName>Background</SettingName>
                <div style={{display: "flex", gap: "20px"}}>
                    <CutButton onClick={() => fileRef.current.click()}>Select</CutButton>
                    {settings['app_bg']?.value && <CutButton onClick={handleResetBG}>Reset</CutButton>}
                </div>
                <input ref={fileRef} type={"file"} accept={"image/*"} style={{display: 'none'}}
                       onChange={handleSelectBackground}/>

            </SettingsBox>
        </React.Fragment>
    );
};

export default SettingsAppearance;