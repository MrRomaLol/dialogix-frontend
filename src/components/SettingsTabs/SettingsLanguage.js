import React from 'react';
import {SettingTabName} from "./SettingsParts";
import styled, {css} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import ListSelect from "../ListSelect";
import {UA, US} from "country-flag-icons/react/3x2";
import {updateUserSetting} from "../../store/fetchSlice";
import {Store} from "react-notifications-component";
import {cT} from "../../localization/funcs";

const SettingsBox = styled.div`
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
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

//TODO: localize whole file

const ChanelType = ({icon, name, isSelected = false, onClick}) => {
    return (
        <ChanelTypeBack onClick={onClick} isSelected={isSelected}>
            <div style={{display: "inherit", alignItems: "inherit"}}>
                {React.cloneElement(icon, {...icon.props, style: {height: "30px", marginRight: "15px"}})}
                <p>{name}</p>
            </div>
            <input type={"radio"} checked={isSelected} readOnly/>
        </ChanelTypeBack>
    )
}

const SettingsLanguage = () => {
    const dispatch = useDispatch();
    const [t, i18n] = useTranslation();
    const {settings, loading} = useSelector(state => state.fetchRoot);
    const langSetting = settings['app_lang'];

    const langs = [
        {item: <ChanelType icon={<US/>} name={'English'}/>, selected: langSetting.value === 'en', name: 'en'},
        {item: <ChanelType icon={<UA/>} name={'Українська'}/>, selected: langSetting.value === 'uk', name: 'uk'}
    ]

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

    const handleChange = e => {
        if (loading) return;

        const data = {
            id: langSetting.id, settingName: "app_lang", settingValue: e.target.value
        }

        dispatch(updateUserSetting(data)).unwrap()
            .then(({settingValue}) => {
                i18n.changeLanguage(settingValue);
            })
            .catch((error) => {
                Store.addNotification({
                    ...notification,
                    message: cT(t("misc.msgErr"), error)
                })
            });
    }

    return (
        <React.Fragment>
            <SettingTabName>Language</SettingTabName>

            <SettingsBox>
                <ListSelect name={'lang'} onChange={handleChange} items={langs} doNotChangeOnLoading isLoading={loading}/>

            </SettingsBox>
        </React.Fragment>
    );
};

export default SettingsLanguage;