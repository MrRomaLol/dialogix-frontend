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
import {getRandomInt} from "../../utils/random";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import MyMessagePlaceholder from "../ChatScreen/MyMessagePlaceholder";
import MemberMessagePlaceholder from "../ChatScreen/MemberMessagePlaceholder";
import {useTranslation} from "react-i18next";
import {cT} from "../../localization/funcs";

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

const ChannelsRandomPlaceholder = () => {
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
    const [ t, i18n ] = useTranslation();
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
        title: t("misc.error"),
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
                        message: cT(t("misc.msgErr"), error)
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
                        message: cT(t("misc.msgErr"), error)
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
                <GuildBarName>{t("channBar.chann")}</GuildBarName>
                <Wrapper>
                    <Content onContextMenu={onContextMenu}>
                        {guild.isLoaded ? guild.channels.map((obj) => {
                                    if (obj.objectType === 'category') {
                                        return <ChannelsCategory key={`category-${obj.id}`} id={obj.id}
                                                                 name={obj.name} channels={obj.channels}
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
                            : <ChannelsRandomPlaceholder/>
                        }
                    </Content>
                </Wrapper>
            </GuildLeftBar>

            <Menu id={ID} animation={'fade'}>
                <Item id="addChannelToCategory" onClick={handleCreateChannel} hidden={isItemHidden} data={'category'}>{cT(t("channBar.createChann"), category?.name)} </Item>
                <Item id="addChannelToCategory" onClick={handleDelete} hidden={isItemHidden}
                      data={'category'}>
                    <div style={{color: "#B13470"}}>{cT(t("channBar.rem"), category?.name)}</div>
                </Item>
                <Separator hidden={isItemHidden} data={'category'}/>
                <Item id="addChannelToCategory" onClick={handleDelete} hidden={isItemHidden}
                      data={'channel'}>
                    <div style={{color: "#B13470"}}>{cT(t("channBar.rem"), channel?.name)}</div>
                </Item>
                <Separator hidden={isItemHidden} data={'channel'}/>
                <Item id="addCategory" onClick={handleCreateCategory}>{t("categModal.createCateg")}</Item>
                <Item id="addChannel" onClick={handleCreateChannel}>{t("channModal.createChann")}</Item>
            </Menu>

            <CreateCategoryModal isOpen={isCreateCategory} onRequestClose={closeCreateCategory}/>
            <CreateChannelModal isOpen={isCreateChannel} onRequestClose={closeCreateChannel} category={category}/>

            <YesNoModal isOpen={yesNoModalOpened} onRequestClose={closeDelete}
                        modalName={cT(t("channBar.del"), category ? category?.name : channel?.name)}
                        firstName={loading ? <DxSpinner/> : t("misc.yes")} secondName={t("misc.no")} onFirst={deleteObject}
                        onSecond={closeDelete}>
                <ModalSubName>{t("channBar.att")}
                    <span
                        style={{color: "#B13470"}}> {category ? cT(t("channBar.categ"), category?.name) : cT(t("channBar.channel"), channel?.name)}</span>{t("channBar.att2")}</ModalSubName>
            </YesNoModal>
        </>
    );
};

export default ChannelsBar;