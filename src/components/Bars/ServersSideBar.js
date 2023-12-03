import React, {useState} from 'react';
import styled from "styled-components";
import {BarsBorder, LRBars, ScrollerBar, ScrollerBarBox} from "./LRBars";
import BarButton from "./BarButton";
import {faPlus, faUsers} from "@fortawesome/free-solid-svg-icons";
import {IconSeparator} from "./SideIconParts";
import CreateGuildModal from "../Modals/CreateGuildModal";
import {useSelector} from "react-redux";
import ServerBarIcon from "./ServerBarIcon";
import {Tooltip} from "react-tooltip";

const EobaniyBlyr = styled.span`
  height: 100%;
  display: flex;
  flex-direction: row;
  filter: drop-shadow(rgba(255, 0, 245, 0.8) -20px 0px 40px);
`
const BarBorder = styled(BarsBorder)`
  clip-path: polygon(100% 0, calc(100% - 20px) 30px, calc(100% - 20px) calc(100% - 30px), 100% 100%,
  20px 100%, 0 calc(100% - 30px), 0 30px, 20px 0);
  margin-right: -22px;
`

const Bar = styled(LRBars)`
  clip-path: polygon(100% 0, 100% 100%, 20px 100%, 0 calc(100% - 30px), 0 30px, 20px 0);
`

const ServersSideBar = () => {
    const {guilds, currentGuildId} = useSelector(state => state.guilds);
    const [isCrateServerModalOpened, setIsCrateServerModalOpened] = useState(false);

    const handleOpenCreateServerModal = () => {
        setIsCrateServerModalOpened(true);
    }

    const handleCloseCreateServerModal = () => {
        setIsCrateServerModalOpened(false);
    }

    return (
        <>
            <EobaniyBlyr>
                <BarBorder/>
                <Bar>
                    <BarButton dataTooltipId={'server-tooltip-servers'} icon={faUsers}/>
                    <BarButton dataTooltipId={'server-tooltip-add'} icon={faPlus}
                               onClick={handleOpenCreateServerModal}/>
                    <IconSeparator/>
                    <ScrollerBarBox>
                        <ScrollerBar>
                            {guilds.map((guild) => (
                                <ServerBarIcon key={guild.id} id={guild.id}
                                               avatarUrl={guild.avatarUrl}
                                               name={guild.name}
                                               isSelected={currentGuildId === guild.id}/>))}
                        </ScrollerBar>
                    </ScrollerBarBox>
                </Bar>
            </EobaniyBlyr>
            <Tooltip id={'server-tooltip-servers'}
                     place="left"
                     content={'Servers (not a button)'}/>
            <Tooltip id={'server-tooltip-add'}
                     place="left"
                     content={'Create server'}/>
            {guilds.map((guild) => (
                <Tooltip key={guild.id} id={`server-tooltip-${guild.id}`}
                         place="left"
                         content={guild.name}/>))}
            <CreateGuildModal isOpen={isCrateServerModalOpened} onRequestClose={handleCloseCreateServerModal}/>
        </>
    );
};

export default ServersSideBar;