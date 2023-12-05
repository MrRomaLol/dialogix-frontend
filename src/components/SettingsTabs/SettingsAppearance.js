import React, {useRef, useState} from 'react';
import {SettingName, SettingTabName} from "./SettingsParts";
import styled from "styled-components";
import CutButton from "../UIElements/CutButton";
import {useDispatch, useSelector} from "react-redux";
import {setAppBackground, updateUserSetting} from "../../store/fetchSlice";
import {Store} from "react-notifications-component";
import {useTranslation} from "react-i18next";

const SettingsBox = styled.div`
  padding: 50px;
  box-sizing: border-box;
`

const SettingsAppearance = () => {
    const dispatch = useDispatch();
    const [ t, i18n ] = useTranslation();
    const {settings} = useSelector(state => state.fetchRoot);
    const fileRef = useRef(null);

    const handleSelectBackground = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 5242880) {
                return Store.addNotification({
                    title: t("misc.error"),
                    type: "danger",
                    insert: "top",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeInDown"],
                    dismiss: {
                        duration: 5000,
                        pauseOnHover: true,
                    },
                    message: t("settAppearance.file2Large")
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
            <SettingTabName>{t("settAppearance.appearance")}</SettingTabName>

            <SettingsBox>
                <SettingName>{t("settAppearance.bg")}</SettingName>
                <div style={{display: "flex", gap: "20px"}}>
                    <CutButton onClick={() => fileRef.current.click()}>{t("misc.sel")}</CutButton>
                    {settings['app_bg']?.value && <CutButton onClick={handleResetBG}>{t("misc.reset")}</CutButton>}
                </div>
                <input ref={fileRef} type={"file"} accept={"image/*"} style={{display: 'none'}}
                       onChange={handleSelectBackground}/>

            </SettingsBox>
        </React.Fragment>
    );
};

export default SettingsAppearance;