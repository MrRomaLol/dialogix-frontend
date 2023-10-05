import React, {useState} from 'react';
import ServerButton from "../ServerScreen/ServerButton";
import {useTheme} from "../../theme";
import ThemeSelector from "./ThemeSelector";

const FriendsSideBar = () => {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    const style = {
        back: {
            height: "100%",
            width: isHovered ? "200px" : "72px",
            backgroundColor: theme.sidebarBackground,
            borderRadius: "0 30px 30px 0",
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
            <ThemeSelector />
        </div>
    );
};

export default FriendsSideBar;