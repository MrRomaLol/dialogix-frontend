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

const Online = () => {
    return(
        <IndicatorBack style={{backgroundColor: "rgb(64,200,0)"}}/>
    )
}

const Away = () => {
    return(
        <IndicatorBack>
            <FontAwesomeIcon icon={faMoon} color={'yellow'} style={{width: '100%', height: '100%'}}/>
        </IndicatorBack>
    )
}

const DND = () => {
    return(
        <IndicatorBack style={{backgroundColor: "red"}}>
            <div style={{width: '80%', aspectRatio:"3 / 1", backgroundColor: "rgba(0,0,0,0.5)"}}></div>
        </IndicatorBack>
    )
}

const Offline = () => {
    return(
        <IndicatorBack style={{backgroundColor: "rgba(0,0,0,0.6)"}}></IndicatorBack>
    )
}

const StatusIndicator = ({className}) => {
    const status = 'dnd';

    const indicator = useMemo(() => {
        return {
            online: <Online/>,
            away: <Away/>,
            dnd: <DND/>,
            offline: <Offline/>,
        }[status];
    }, [status])

    return (
        <div className={className}>
            {indicator}
        </div>
    );
};

export default StatusIndicator;