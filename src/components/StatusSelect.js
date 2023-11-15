import React from 'react';
import styled, {css} from "styled-components";
import {AwayStatus, DNDStatus, OfflineStatus, OnlineStatus} from "./StatusIndicator";

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
    const handleChangeStatus = (status) => {
        if (isStatusLoading) return;
        onChange(status)
    }

    return (
        <>
            <SelectOption isSelected={currentStatus === 'online'} isStatusLoading={isStatusLoading} onClick={() => handleChangeStatus('online')}>
                Online
                {<Icon><OnlineStatus/></Icon>}
            </SelectOption>
            <SelectOption isSelected={currentStatus === 'away'} isStatusLoading={isStatusLoading} onClick={() => handleChangeStatus('away')}>
                Away
                {<Icon><AwayStatus/></Icon>}
            </SelectOption>
            <SelectOption isSelected={currentStatus === 'dnd'} isStatusLoading={isStatusLoading} onClick={() => handleChangeStatus('dnd')}>
                DnD
                {<Icon><DNDStatus/></Icon>}
            </SelectOption>
            <SelectOption isSelected={currentStatus === 'offline'} isStatusLoading={isStatusLoading} onClick={() => handleChangeStatus('offline')}>
                Offline
                {<Icon><OfflineStatus/></Icon>}
            </SelectOption>
        </>
    )
}
export default StatusSelect;