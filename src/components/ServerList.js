import React, {useRef, useState} from 'react';
import ServerButton from "./ServerButton";
import "../styles/styles.css"
import "bootstrap/dist/css/bootstrap.min.css"
import {useNavigate} from "react-router-dom";
import mainScreen from "./MainScreen";

const ServerName = ({top, name, isHovered}) => {
    return (
        <div style={{top: `${top + 24}px`}}
             className={"server-name p-1 text-white z-3 text-nowrap position-absolute" + (isHovered ? " server-name-show" : "")}>
            {name}
        </div>
    )
}

const ServerList = ({onClick}) => {
    const childRefs = useRef([]);

    const [currentHoverServerIndex, setCurrentHoverServerIndex] = useState(-1);

    const [serverNamePos, setServerNamePos] = useState(0)

    const servers = [
        {name: "123dedf"},
        {name: "123esfsf"},
        {name: "123fesfesf"},
        {name: "123tgfhtf"},
        {name: "123uikuoki"},
        {name: "1237y87y8"},
        {name: "123"},
        {name: "123"},
        {name: "123"},
    ]

    const isServerHovered = () => {
        return currentHoverServerIndex !== -1;
    }

    const handleScrollList = () => {
        if (!isServerHovered()) return;
        childRefs.current[currentHoverServerIndex].disableHover();
    }

    const handleOnServerHover = (isHovered, serverIndex) => {
        const hoveredServerIndex = isHovered ? serverIndex : -1;
        setCurrentHoverServerIndex(hoveredServerIndex);
    }

    const getHoveredServerPosition = () => {
        if (isServerHovered()) {
            return childRefs.current[currentHoverServerIndex].getPosition();
        }
    }

    const handleMouseMove = () => {
        if (isServerHovered()) {
            const top = getHoveredServerPosition().top;
            setServerNamePos(top);
        }
    }

    const handleMainScreen = () => {
        onClick?.({type: "main"});
    }

    const handleServerScreen = () => {
        onClick?.({type: "server"});
    }

    return (
        <div>
            <div className={"app-groups"} onScroll={handleScrollList} onMouseMove={handleMouseMove}>
                <ServerButton name={"Dialogix"} onClick={handleMainScreen}/>
                <div className={"d-flex mb-2 p-0"} style={{justifyContent: "center"}}>
                    <hr className={"m-0 p-0 rounded-5"} style={{border: "2px solid white", width: "60%"}}/>
                </div>

                {servers.map((obj, index) => (
                    <ServerButton name={obj.name} key={index} ref={(ref) => {
                        childRefs.current[index] = ref
                    }} onHover={handleOnServerHover} serverIndex={index} onClick={() => handleServerScreen()}/>
                ))}
            </div>
            {isServerHovered() && <ServerName name={servers[currentHoverServerIndex].name} top={serverNamePos}
                                              isHovered={isServerHovered()}/>}
        </div>
    );
};

export default ServerList;