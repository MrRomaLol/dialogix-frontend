import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import "../../../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ServerButton({image, name, onHover, serverIndex, isNotificated, isSelected, onClick}, ref) {
    const [isHovered, setIsHovered] = useState(false);
    const objectRef = useRef(null);

    let lineHeight = 0;

    if (isSelected) lineHeight = 40;
    else if (isHovered) lineHeight = 25;
    else if (isNotificated) lineHeight = 10;

    const style = {

        line: {
            width: lineHeight > 0 ? "5px" : "0px",
            height: lineHeight + "px",
            borderRadius: lineHeight > 0 ? "0 10px 10px 0" : "0",
            opacity: lineHeight > 0 ? "1" : "0",
        },
        image: {
            borderRadius: isHovered || isSelected ? "30%" : "50%",
        },

    }

    const handleOnHover = (isHovered) => {
        setIsHovered(isHovered);
        onHover?.(isHovered, serverIndex);
    }

    const disableHover = () => {
        handleOnHover(false);
    }

    const getPosition = () => {
        if (objectRef.current) {
            return objectRef.current.getBoundingClientRect();
        }
    }

    const handleOnClick = () => {
        onClick?.();
    }

    useImperativeHandle(ref, () => ({disableHover, getPosition}))

    return (
        <div className={"server-button-holder position-relative"} ref={objectRef}>
            <div className={"server-button-line position-relative"} style={{...style.line}}/>
            {image ? <img src={image} alt={name} width={48} height={48} className={"server-button-image position-absolute"} style={{...style.image}}
                          onMouseEnter={() => handleOnHover(true)}
                          onMouseLeave={() => handleOnHover(false)}
                          onClick={handleOnClick}/> :
                <div className={"server-button-image position-absolute"} style={{...style.image, width: "48px", height: "48px", backgroundColor: "rgba(0,0,0,0.4)"}}
                     onMouseEnter={() => handleOnHover(true)}
                     onMouseLeave={() => handleOnHover(false)}
                     onClick={handleOnClick}>
                    <div className={"namePlaceholder text-white d-flex justify-content-center align-items-center"}>{name.substring(0, 1)}</div>
                </div>}
        </div>
    );
}

export default forwardRef(ServerButton);