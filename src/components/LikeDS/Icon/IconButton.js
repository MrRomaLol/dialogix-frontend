import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const IconButton = ({icon, style, hoverStyle, onClick, className = ""}) => {
    const [isHovered, setIsHovered] = useState(false);

    // const buttonStyle = isHovered ? (hoverStyle || style) : style;

    const buttonStyle = {
        ...style,
        ...(isHovered ? hoverStyle : {})
    }

    const handleHover = (isHovered) => {
        setIsHovered(isHovered);
    }

    const handleClick = () => {
        onClick?.();
    }

    return (
        <FontAwesomeIcon icon={icon} style={buttonStyle} onMouseEnter={() => handleHover(true)}
                         onMouseLeave={() => handleHover(false)}
                         onClick={handleClick} className={className}/>
    );
};

export default IconButton;