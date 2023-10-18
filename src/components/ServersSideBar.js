import React from 'react';
import styled from "styled-components";
import {BarsBorder, LRBars} from "./styled-parts/LRBars";
import BarButton from "./BarButton";
import {faPlus, faUsers} from "@fortawesome/free-solid-svg-icons";

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
    return (
        <EobaniyBlyr>
            <BarBorder/>
            <Bar>
                <BarButton icon={faUsers} float={'right'}/>
                <BarButton icon={faPlus} float={'right'}/>
            </Bar>
        </EobaniyBlyr>
    );
};

export default ServersSideBar;