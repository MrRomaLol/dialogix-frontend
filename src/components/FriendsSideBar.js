import React from 'react';
import styled from "styled-components";
import {BarWrapper, LRBars} from "./styled-parts/LRBars";

const EobaniyBlyr = styled.span`
  height: 100%;
  display: flex;
  flex-direction: row;
  filter: drop-shadow(rgba(255, 0, 245, 0.8) 20px 0px 40px);
`
const LeftBarWrapper = styled(BarWrapper)`
  clip-path: polygon(calc(100% - 20px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 20px) 100%,
  calc(100% - 22px) 100%, calc(100% - 2px) calc(100% - 30px), calc(100% - 2px) 30px, calc(100% - 22px) 0);

  margin-left: -22px;
`

const Bar = styled(LRBars)`
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 20px) 100%, 0 100%);
`

const FriendsSideBar = () => {
    return (
        <EobaniyBlyr>
            <Bar>

            </Bar>
            <LeftBarWrapper/>
        </EobaniyBlyr>
    );
};

export default FriendsSideBar;