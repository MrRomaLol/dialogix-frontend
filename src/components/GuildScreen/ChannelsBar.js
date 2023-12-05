import React, {useState} from 'react';
import styled from "styled-components";
import ContentContainer from "../ContentContainer";
import ChannelsCategory from "./ChannelsCategory";
import GuildChannels from "./GuildChannels";
import {GuildBarName} from "./GuildParts";
import CreateCategoryModal from "../Modals/CreateCategoryModal";
import CreateChannelModal from "../Modals/CreateChannelModal";
import {Item, Menu, Separator, useContextMenu} from "react-contexify";
import YesNoModal from "../Modals/YesNoModal";
import {ModalSubName} from "../Modals/ModalParts";
import {useDispatch, useSelector} from "react-redux";
import DxSpinner from "../DXSpinner";
import {deleteCategory, deleteChannel} from "../../store/guildsSlice";
import {Store} from "react-notifications-component";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

const GuildLeftBar = styled(ContentContainer)`
  height: 100%;
  width: 250px;
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

const ChannelsPlaceholder = () => {
    return (
        <SkeletonTheme baseColor="#573166" highlightColor="#9c61b2">
            <Skeleton width={"100%"} height={25} style={{marginBottom: "20px"}}/>
            <Skeleton width={"100%"} height={25} style={{marginBottom: "20px"}}/>
            <Skeleton width={"100%"} height={25} style={{marginBottom: "20px"}}/>
            <Skeleton width={"100%"} height={25} style={{marginBottom: "20px"}}/>
            <Skeleton width={"100%"} height={25} style={{marginBottom: "20px"}}/>
        </SkeletonTheme>
    )
}

const ChannelsBar = ({guild}) => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.auth);
    const {loading} = useSelector(state => state.guilds);
    const [isCreateCategory, setIsCreateCategory] = useState(false);
    const [isCreateChannel, setIsCreateChannel] = useState(false);
    const [category, setCategory] = useState(null);
    const [channel, setChannel] = useState(null);
    const [yesNoModalOpened, setYesNoModalOpened] = useState(false);

    const ID = "create";

    const {show} = useContextMenu({
        id: ID,
    });

    const showContextMenu = (event, showItemsOf) => {
        if (userInfo.id !== guild.creatorId) return;

        event.stopPropagation();
        show({
            event,
            props: {
                showItemsOf
            }
        })
    }

    const onContextMenu = (event) => {
        setCategory(null);
        setChannel(null);
        showContextMenu(event);
    }

    const onContextMenuCategory = ({event, id, name, channels}) => {
        setCategory({id, name, channels});
        setChannel(null);
        showContextMenu(event, 'category');
    }


    const onContextMenuChannel = ({event, id, name, type}) => {
        setChannel({id, name, type});
        setCategory(null);
        showContextMenu(event, 'channel');
    }

    const isItemHidden = ({props, data}) => {
        return props.showItemsOf !== data;
    }

    const notification = {
        title: "Error!",
        type: "danger",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeInDown"],
        dismiss: {
            duration: 5000,
            pauseOnHover: true,
        }
    }

    const deleteObject = () => {
        if (loading) return;

        if (category) {
            dispatch(deleteCategory({categoryId: category.id})).unwrap()
                .then(() => {
                    setYesNoModalOpened(false);
                })
                .catch((error) => {
                    Store.addNotification({
                        ...notification,
                        message: `Something went wrong: ${error}`
                    })
                })
        } else if (channel) {
            dispatch(deleteChannel({channelId: channel.id})).unwrap()
                .then(() => {
                    setYesNoModalOpened(false);
                })
                .catch((error) => {
                    Store.addNotification({
                        ...notification,
                        message: `Something went wrong: ${error}`
                    })
                })
        }
    }

    const addChannelToCategory = ({id, name, channels}) => {
        setCategory({id, name, channels});
        setIsCreateChannel(true);
    }

    const handleCreateCategory = () => {
        setIsCreateCategory(true);
    }

    const closeCreateCategory = () => {
        setIsCreateCategory(false);
    }

    const handleCreateChannel = () => {
        setIsCreateChannel(true);
    }

    const closeCreateChannel = () => {
        setIsCreateChannel(false);
    }

    const handleDelete = () => {
        setYesNoModalOpened(true);
    }

    const closeDelete = () => {
        setYesNoModalOpened(false);
    }

    return (
        <>
            <GuildLeftBar>
                <GuildBarName>Channels</GuildBarName>
                <Wrapper>
                    <Content onContextMenu={onContextMenu}>
                        {guild.isLoaded ? guild.channels.map((obj) => {
                                    if (obj.objectType === 'category') {
                                        return <ChannelsCategory key={`category-${obj.id}`} id={obj.id}
                                                                 name={obj.name} channels={obj.channels}
                                                                 showPlus={userInfo.id === guild.creatorId}
                                                                 onContextMenu={onContextMenuCategory}
                                                                 onPlusClick={addChannelToCategory}
                                                                 onContextMenuChannel={onContextMenuChannel}/>
                                    } else if (obj.objectType === 'channel') {
                                        return <GuildChannels key={`channel-${obj.id}`} id={obj.id}
                                                              name={obj.name} type={obj.channel_type}
                                                              onContextMenu={onContextMenuChannel}/>
                                    }
                                }
                            )
                            : <ChannelsPlaceholder/>
                        }
                    </Content>
                </Wrapper>
            </GuildLeftBar>

            <Menu id={ID} animation={'fade'}>
                <Item id="addChannelToCategory" onClick={handleCreateChannel} hidden={isItemHidden} data={'category'}>Create
                    Channel in {category?.name}</Item>
                <Item id="addChannelToCategory" onClick={handleDelete} hidden={isItemHidden}
                      data={'category'}>
                    <div style={{color: "#B13470"}}>Remove {category?.name}</div>
                </Item>
                <Separator hidden={isItemHidden} data={'category'}/>
                <Item id="addChannelToCategory" onClick={handleDelete} hidden={isItemHidden}
                      data={'channel'}>
                    <div style={{color: "#B13470"}}>Remove {channel?.name}</div>
                </Item>
                <Separator hidden={isItemHidden} data={'channel'}/>
                <Item id="addCategory" onClick={handleCreateCategory}>Create Category</Item>
                <Item id="addChannel" onClick={handleCreateChannel}>Create Channel</Item>
            </Menu>

            <CreateCategoryModal isOpen={isCreateCategory} onRequestClose={closeCreateCategory}/>
            <CreateChannelModal isOpen={isCreateChannel} onRequestClose={closeCreateChannel} category={category}/>

            <YesNoModal isOpen={yesNoModalOpened} onRequestClose={closeDelete}
                        modalName={`Delete ${category ? category?.name : channel?.name}?`}
                        firstName={loading ? <DxSpinner/> : 'yes'} secondName={'no'} onFirst={deleteObject}
                        onSecond={closeDelete}>
                <ModalSubName>Attention: You are on the verge of permanently deleting the
                    <span
                        style={{color: "#B13470"}}> {category ? `category ${category?.name}` : `channel ${channel?.name}`}</span>.
                    This action cannot be undone. Are you absolutely sure you want to proceed with this
                    deletion?</ModalSubName>
            </YesNoModal>
        </>
    );
};

export default ChannelsBar;