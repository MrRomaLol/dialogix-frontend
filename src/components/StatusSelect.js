import React from 'react';
import styled, {css} from "styled-components";
import {AwayStatus, DNDStatus, OfflineStatus, OnlineStatus} from "./StatusIndicator";
import {useTranslation} from "react-i18next";

const SelectOption = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  transition-duration: 200ms;
  user-select: none;
  
  ${({isStatusLoading}) => isStatusLoading && css`
    color: gray;
  `}

  ${({isSelected, isStatusLoading}) => (!isSelected && !isStatusLoading) && css`
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  `}

  ${({isSelected}) => isSelected && css`
    background-color: rgba(255, 0, 245, 0.3);
    font-weight: bold;
  `}
`

const Icon = styled.div`
  width: 20px;
  height: 20px;
`
const StatusSelect = ({onChange, currentStatus, isStatusLoading}) => {
    const [ t, i18n ] = useTranslation();
    const handleChangeStatus = (status) => {
        if (isStatusLoading) return;
        onChange(status)
    }

    return (
        <>
            <SelectOption isSelected={currentStatus === 'online'} isStatusLoading={isStatusLoading} onClick={() => handleChangeStatus('online')}>
                {t("statusSel.online")}
                {<Icon><OnlineStatus/></Icon>}
            </SelectOption>
            <SelectOption isSelected={currentStatus === 'away'} isStatusLoading={isStatusLoading} onClick={() => handleChangeStatus('away')}>
                {t("statusSel.away")}
                {<Icon><AwayStatus/></Icon>}
            </SelectOption>
            <SelectOption isSelected={currentStatus === 'dnd'} isStatusLoading={isStatusLoading} onClick={() => handleChangeStatus('dnd')}>
                {t("statusSel.dnd")}
                {<Icon><DNDStatus/></Icon>}
            </SelectOption>
            <SelectOption isSelected={currentStatus === 'offline'} isStatusLoading={isStatusLoading} onClick={() => handleChangeStatus('offline')}>
                {t("statusSel.off")}
                {<Icon><OfflineStatus/></Icon>}
            </SelectOption>
        </>
    )
}
export default StatusSelect;