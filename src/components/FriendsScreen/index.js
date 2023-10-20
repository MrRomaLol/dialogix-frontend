import React from 'react';
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faUserClock, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import useWindowSize from "../../hooks/useWindowSize";

const Tabs = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
`

const TabContainer = styled.div`
  position: relative;

  &:not(:first-child) {
    margin-left: -50px;
  }
`

const TabBack = styled.div`
  height: 50px;

  clip-path: polygon(50px 0, 100% 0, calc(100% - 50px) 100%, 0 100%);

  color: #9788B1;
  font-size: 24px;

  padding-left: 50px;
  padding-right: 50px;

  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`

const TabBorder = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(188, 44, 201, 0.62);

  clip-path: polygon(100% 0, calc(100% - 50px) 100%, 0 100%,
  0 calc(100% - 2px), calc(100% - 52px) calc(100% - 2px), calc(100% - 2px) 0px);
`

const Tab = ({icon, name}) => {
    const size = useWindowSize();

    return (
        <TabContainer>
            <TabBack>
                {icon && <FontAwesomeIcon style={{marginRight: "15px"}} icon={icon}/>}
                {size.width > 1200 && name}
            </TabBack>
            <TabBorder/>
        </TabContainer>
    )
}



const FriendsScreen = () => {
    return (
        <ContentContainer>
            <Tabs>
                <Tab name={"Friends"} icon={faUser}/>
                <Tab name={"Add friend"} icon={faUserPlus}/>
                <Tab name={"Pending"} icon={faUserClock}/>
            </Tabs>
        </ContentContainer>
    );
};

export default FriendsScreen;