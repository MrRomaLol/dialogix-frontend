import React, {useMemo, useState} from 'react';
import ContentContainer from "../ContentContainer";
import styled, {css} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faUser, faUserClock, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import useWindowSize from "../../hooks/useWindowSize";
import {useDispatch, useSelector} from "react-redux";
import {
    FRIENDS_SUBSCREEN_ADD_FRIENDS_TAB,
    FRIENDS_SUBSCREEN_FRIENDS_TAB,
    FRIENDS_SUBSCREEN_PENDING_TAB,
    setSubScreen
} from "../../store/screenStateSlice";
import FriendListTab from "./FriendListTab";
import FriendSentPendingTab from "./FriendSentPendingTab";
import FriendAddTab from "./FriendAddTab";
import {FriendsInputField} from "./StyledParts";

const FullScreenContainer = styled(ContentContainer)`
  width: 100%;
  height: 100%;
`

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

const BackContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`

const TabBack = styled(BackContainer)`
  height: 50px;

  clip-path: polygon(50px 0, 100% 0, calc(100% - 50px) 100%, 0 100%);

  color: #9788B1;
  font-size: 22px;
  user-select: none;

  transition-duration: 200ms;
  cursor: pointer;

  ${({isSelected}) => isSelected && css`
    background-color: rgba(188, 44, 201, 0.3);
    cursor: default;
  `}
  &:hover {
    ${({isSelected}) => !isSelected && css`
      background-color: rgba(188, 44, 201, 0.1);
    `}
  }

  font-family: Furore, serif;

  padding-left: 50px;
  padding-right: 50px;
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

const Icons = styled(FontAwesomeIcon)`
  margin-right: 15px;
  color: #9788B1;
  font-size: 26px;
`

const Tab = ({icon, name, onClick, isSelected}) => {
    const size = useWindowSize();

    return (
        <TabContainer>
            <TabBack isSelected={isSelected} onClick={() => onClick?.()}>
                {icon && <Icons icon={icon}/>}
                {size.width > 1200 && name}
            </TabBack>
            <TabBorder/>
        </TabContainer>
    )
}

const SearchFiledBack = styled(BackContainer)`
  flex: 1;
  margin-left: -50px;

  padding-left: 50px;

  border-bottom: solid rgba(188, 44, 201, 0.62) 2px;

  transition-duration: 200ms;

  clip-path: polygon(50px 0, 100% 0, 100% 100%, 0 100%);

  ${({hasInput}) => hasInput && css`
    background-color: rgba(188, 44, 201, 0.3);
  `}
  &:hover {
    ${({hasInput}) => !hasInput && css`
      background-color: rgba(188, 44, 201, 0.1);
    `}
  }
`

const SearchField = ({searchInput, onInputChange}) => {
    return (
        <SearchFiledBack hasInput={searchInput}>
            <Icons icon={faMagnifyingGlass}/>
            <FriendsInputField value={searchInput} onChange={onInputChange}/>
        </SearchFiledBack>
    )
}

const FriendsScreen = () => {
    const dispatch = useDispatch();
    const subScreenName = useSelector(state => state.screenState.subScreen);

    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = e => {
        setSearchQuery(e.target.value);
    }

    const subScreenComponent = useMemo(() => {
        switch (subScreenName) {
            case FRIENDS_SUBSCREEN_FRIENDS_TAB:
                return <FriendListTab searchQuery={searchQuery}/>;
            case FRIENDS_SUBSCREEN_PENDING_TAB:
                return <FriendSentPendingTab searchQuery={searchQuery}/>;
            case FRIENDS_SUBSCREEN_ADD_FRIENDS_TAB:
                return <FriendAddTab/>;
            default:
                return null;
        }
    }, [subScreenName, searchQuery]);

    const setTab = (tabName) => {
        dispatch(setSubScreen({subScreenName: tabName}))
    }

    return (
        <FullScreenContainer>
            <Tabs>
                <Tab name={"Friends"} isSelected={subScreenName === FRIENDS_SUBSCREEN_FRIENDS_TAB} icon={faUser}
                     onClick={() => setTab(FRIENDS_SUBSCREEN_FRIENDS_TAB)}/>
                <Tab name={"Pending"} isSelected={subScreenName === FRIENDS_SUBSCREEN_PENDING_TAB} icon={faUserClock}
                     onClick={() => setTab(FRIENDS_SUBSCREEN_PENDING_TAB)}/>
                <Tab name={"Add friend"} isSelected={subScreenName === FRIENDS_SUBSCREEN_ADD_FRIENDS_TAB} icon={faUserPlus}
                     onClick={() => setTab(FRIENDS_SUBSCREEN_ADD_FRIENDS_TAB)}/>
                {subScreenName !== FRIENDS_SUBSCREEN_ADD_FRIENDS_TAB &&
                    <SearchField searchInput={searchQuery} onInputChange={handleInputChange}/>}
            </Tabs>
            {subScreenComponent}
        </FullScreenContainer>
    );
};

export default FriendsScreen;