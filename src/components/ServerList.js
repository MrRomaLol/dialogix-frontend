import React, {useRef, useState} from 'react';
import ServerButton from "./ServerButton";
import "../styles/styles.css"
import "bootstrap/dist/css/bootstrap.min.css"

const ServerName = ({top, name, isHovered}) => {
    return (
        <div style={{top: `${top + 24}px`}} className={"server-name p-1 text-white z-3 text-nowarp position-absolute" + (isHovered ? " server-name-show" : "")}>
            {name}
        </div>
    )
}

const ServerList = () => {
    const childRefs = useRef([]);

    const [currentHoverServerIndex, setCurrentHoverServerIndex] = useState(-1);

    const [serverNamePos, setServerNamePos] = useState(0)

    const servers = [
        {name: "123dedf esjnfesjfsn jfesnfjesn fsejnfs"},
        {name: "123esfsf"},
        {name: "123fesfesf"},
        {name: "123tgfhtf"},
        {name: "123uikuoki"},
        {name: "1237y87y8"},
        {name: "123"},
        {name: "123"},
        {name: "123"},
        {name: "123"},
        {name: "123"},
        {name: "123"},
        {name: "123"},
        {name: "123"},
        {name: "123"},
        {name: "123"},
        {name: "123"},
        {name: "123"},
        {name: "123"},
        {name: "123"},
        {name: "123"},
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

    return (
        <div>
            <div className={"app-groups"} onScroll={handleScrollList} onMouseMove={handleMouseMove}>
                <ServerButton name={"Dialogix"} />

                {servers.map((obj, index) => (
                    <ServerButton name={obj.name} key={index} ref={(ref) => {
                        childRefs.current[index] = ref
                    }} onHover={handleOnServerHover} serverIndex={index}/>
                ))}
            </div>
            {isServerHovered() && <ServerName name={servers[currentHoverServerIndex].name} top={serverNamePos} isHovered={isServerHovered()}/> }
        </div>
    );
};

export default ServerList;