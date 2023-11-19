import React from 'react';
import styled, {css} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVolumeHigh} from "@fortawesome/free-solid-svg-icons";

const AlertIconStyle = styled(FontAwesomeIcon)`
  color: white;
  background-color: #6F2DA8;
  padding: 3px;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  transition-duration: 200ms;
  z-index: 1000;
`

const VoiceIcon = ({className}) => {
    return <AlertIconStyle className={className} icon={faVolumeHigh}/>
};

export default VoiceIcon;