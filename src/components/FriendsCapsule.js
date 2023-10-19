import React from 'react';
import ContentContainer from "./ContentContainer";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders, faUser, faUserClock, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import useWindowSize from "./hooks/useWindowSize";

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

const CardContainer = styled.div`
  height: 100px;
  width: 400px;

  margin-bottom: 30px;

  position: relative;
`

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(61, 38, 84, 0.2);

  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%);

  display: flex;


  color: white;
  font-size: 30px;
`

const CardBorder = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(188, 44, 201, 0.62);

  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%, 0 0,
  2px 2px, 2px calc(100% - 2px), calc(100% - 50px) calc(100% - 2px), calc(100% - 2px) calc(100% - 50px), calc(100% - 2px) 2px, 2px 2px)

`

const Grid = styled.div`
  width: 100%;
  
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  
  box-sizing: border-box;
  
  padding-top: 10px;

  border-top: solid rgba(188, 44, 201, 0.62) 2px;
  
  overflow-y: scroll;
`

const FriendCard = ({nick}) => {
    return (
        <CardContainer>
            <CardBack>
                <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%", alignItems: "center"}}>
                    <div style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        backgroundColor: "gray",
                        marginRight: "10px",
                        marginLeft: "10px"
                    }}>
                    </div>
                    {nick}
                </div>
                <FontAwesomeIcon icon={faSliders} style={{color: "#C087D4", marginRight: "10px", marginTop: "10px"}}/>
            </CardBack>
            <CardBorder/>
        </CardContainer>
    )
}

const FriendsCapsule = () => {
    return (
        <ContentContainer>
            <Tabs>
                <Tab name={"Friends"} icon={faUser}/>
                <Tab name={"Add friend"} icon={faUserPlus}/>
                <Tab name={"Pending"} icon={faUserClock}/>
            </Tabs>
            <Grid className={"scroll-bar"}>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
                <FriendCard nick={"friend"}/>
            </Grid>
        </ContentContainer>
    );
};

export default FriendsCapsule;