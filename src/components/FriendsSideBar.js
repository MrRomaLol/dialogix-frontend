import React from 'react';
import styled from "styled-components";
import {BarsBorder, LRBars} from "./styled-parts/LRBars";
import BarButton from "./BarButton";
import {faPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import {IconSeparator} from "./styled-parts/SideIconParts";

const EobaniyBlyr = styled.span`
  height: 100%;
  display: flex;
  flex-direction: row;
  filter: drop-shadow(rgba(255, 0, 245, 0.8) 20px 0px 40px);
`
const BarBorder = styled(BarsBorder)`
  clip-path: polygon(calc(100% - 20px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 20px) 100%,
  calc(100% - 22px) 100%, calc(100% - 2px) calc(100% - 30px), calc(100% - 2px) 30px, calc(100% - 22px) 0);
  margin-left: -22px;
`

const Bar = styled(LRBars)`
  position: relative;
  display: flex;
  flex-direction: column;

  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 20px) 100%, 0 100%);
`

const Scroller = styled.div`
  overflow-y: scroll;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  &::-webkit-scrollbar {
    display: none;
  }
`

const FriendsSideBar = () => {


    return (
        <EobaniyBlyr>
            <Bar>
                <BarButton icon={faUser}/>
                <BarButton icon={faPlus}/>
                <IconSeparator/>

                <div style={{flex: 1, position: 'relative'}}>
                    <Scroller>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>
                        <BarButton icon={faPlus}/>

                    </Scroller>
                </div>

            </Bar>
            <BarBorder/>
        </EobaniyBlyr>
    );
};

export default FriendsSideBar;