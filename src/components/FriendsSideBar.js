import React from 'react';
import styled from "styled-components";
import {LRBars} from "./styled-parts/LRBars";

const Bar = styled(LRBars)`
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 20px) 100%, 0 100%);
  
`

const FriendsSideBar = () => {
    return (
        <Bar>

        </Bar>
    );
};

export default FriendsSideBar;