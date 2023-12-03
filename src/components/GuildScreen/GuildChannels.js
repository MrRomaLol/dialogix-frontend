import React, {useMemo} from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faVolumeHigh} from "@fortawesome/free-solid-svg-icons";

const ChannelsBack = styled.div`
  display: flex;
  width: 100%;
  color: #C5C5C5;
  user-select: none;
  font-family: "JetBrains Mono", serif;
  font-size: 20px;
  padding: 4px 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition-duration: 200ms;

  &:hover {
    color: #fff;
    background-color: rgba(188, 44, 201, 0.1);
  }
`

const Icon = styled(FontAwesomeIcon)`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`

const GuildChannels = ({id, name, type, onContextMenu}) => {
    const icon = useMemo(() => {
        return {
            voice: faVolumeHigh,
            text: faComments,
        }[type];
    }, [type])

    const contextMenu = (e) => {
        onContextMenu({event: e, id, name, type});
    }

    return (
        <ChannelsBack onContextMenu={contextMenu}>
            <Icon icon={icon}/>
            {name}
        </ChannelsBack>
    );
};

export default GuildChannels;