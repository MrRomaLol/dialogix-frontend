import React, {useState} from 'react';
import ServerButton from "../LikeDS/ServerScreen/ServerButton";
import {useTheme} from "../../theme";

const ServerSideBar = () => {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    const style = {
        back: {
            height: "100%",
            width: isHovered ? "200px" : "72px",
            backgroundColor: theme.sidebarBackground,
            borderRadius: "30px 0 0 30px",
            paddingTop: "10px",
            paddingBottom: "10px",
            transitionDuration: "150ms",
            transitionTimingFunction: "ease-in"
        }
    }

    const handleIsHovered = (isHovered) => {
        setIsHovered(isHovered);
    }

    return (
        <div style={style.back}
             onMouseEnter={() => handleIsHovered(true)}
             onMouseLeave={() => handleIsHovered(false)}>
            <ServerButton name={"qwe"}/>
        </div>
    );
};

export default ServerSideBar;