import React from 'react';
import styled from "styled-components";
import Flex from "./StyledComponents/Flex";
import LeftSide from "./Header/LeftSide";
import CenterSide from "./Header/CenterSide";
import RightSide from "./Header/RightSide";

let props = {
    backgroundColor: '#BC2CC9',
    opacity: '62%',
};

const Header = () => {
    return <Flex>
        <LeftSide   {...props} />
        <CenterSide {...props} />
        <RightSide  {...props} />
    </Flex>

};

export default Header;