import React, {useMemo} from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon} from "@fortawesome/free-solid-svg-icons";

const IndicatorBack = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const OnlineStatus = () => {
    return (
        <IndicatorBack style={{backgroundColor: "rgb(64,200,0)"}}/>
    )
}

export const AwayStatus = () => {
    return (
        <IndicatorBack>
            <FontAwesomeIcon icon={faMoon} color={'yellow'} style={{width: '100%', height: '100%'}}/>
        </IndicatorBack>
    )
}

export const DNDStatus = () => {
    return (
        <IndicatorBack style={{backgroundColor: "red"}}>
            <div style={{width: '80%', aspectRatio: "3 / 1", backgroundColor: "rgba(0,0,0,0.5)"}}></div>
        </IndicatorBack>
    )
}

export const OfflineStatus = () => {
    return (
        <IndicatorBack style={{backgroundColor: "rgba(0,0,0,0.6)"}}></IndicatorBack>
    )
}

const StatusIndicator = (props) => {
    const indicator = useMemo(() => {
        return {
            online: <OnlineStatus/>,
            away: <AwayStatus/>,
            dnd: <DNDStatus/>,
            offline: <OfflineStatus/>,
        }[props.status];
    }, [props.status])

    return (
        <div {...props}>
            {indicator}
        </div>
    );
};

export default StatusIndicator;