import React, {useState} from 'react';
import styled from "styled-components";
import ContentContainer from "../ContentContainer";
import useWindowSize from "../../hooks/useWindowSize";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Item, Menu, useContextMenu} from "react-contexify";
import {use} from "i18next";
import CreateCategoryModal from "../Modals/CreateCategoryModal";
import CreateChannelModal from "../Modals/CreateChannelModal";

const GuildLeftBar = styled(ContentContainer)`
  height: 100%;
  width: 250px;
`

const GuildChat = styled(ContentContainer)`
  display: flex;
  flex: 1;
  margin: 0 20px;

  height: 100%;
`

const GuildRightBar = styled(ContentContainer)`
  height: 100%;
  width: 250px;
`

const BarName = styled.div`
  font-family: Furore, serif;
  color: #9788B1;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  padding-left: 10px;
  border-bottom: 2px solid rgba(188, 44, 201, 0.62);
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const Content = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: auto;
`

const InviteUsersBack = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  padding: 10px 20px;
  user-select: none;
  transition-duration: 200ms;
  cursor: pointer;

  &:hover {
    background-color: rgba(188, 44, 201, 0.1);
  }
`

const InviteUsers = () => {
    return (
        <InviteUsersBack>
            <FontAwesomeIcon icon={faUserPlus} color={"#723AAA"}/>
            <div style={{color: "#9788B1", fontFamily: "Furore, serif"}}>Invite users</div>
        </InviteUsersBack>
    )
}

const GuildScreen = () => {
    const {width} = useWindowSize();

    const [isCreateCategory, setIsCreateCategory] = useState(false);
    const [isCreateChannel, setIsCreateChannel] = useState(false);

    const ID = "create";

    const {show} = useContextMenu({
        id: ID,
    });

    const showContextMenu = (event) => {
        show({
            event,
            props: {
                key: 'value'
            }
        })
    }

    const handleCreateCategory = () => {
        setIsCreateCategory(true);
    }

    const closeCreateCategory = () => {
        setIsCreateCategory(false);
    }

    const handleCreateChannel= () => {
        setIsCreateChannel(true);
    }

    const closeCreateChannel= () => {
        setIsCreateChannel(false);
    }

    return (
        <div style={{display: "flex", width: "100%", height: "100%"}}>
            <GuildLeftBar>
                <BarName>Channels</BarName>
                <Wrapper>
                    <Content onContextMenu={showContextMenu}>

                    </Content>
                </Wrapper>
            </GuildLeftBar>
            <GuildChat>

            </GuildChat>
            {width > 1000 && <GuildRightBar>
                <BarName>Users</BarName>
                <InviteUsers/>
                <Wrapper>
                    <Content>
                    </Content>
                </Wrapper>
            </GuildRightBar>}
            <Menu id={ID} animation={'fade'}>
                <Item id="addCategory" onClick={handleCreateCategory}>Add Category</Item>
                <Item id="addChannel" onClick={handleCreateChannel}>Add Channel</Item>
            </Menu>

            <CreateCategoryModal isOpen={isCreateCategory} onRequestClose={closeCreateCategory}/>
            <CreateChannelModal isOpen={isCreateChannel} onRequestClose={closeCreateChannel}/>
        </div>
    );
};

export default GuildScreen;