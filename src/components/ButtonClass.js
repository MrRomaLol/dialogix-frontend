import React, {useState} from 'react';

const ButtonClass = ({
                         name = 'Button name',
                         textColor = 'black',
                         hoverTextColor = 'white',
                         buttonColor = 'transparent',
                         hoverColor = 'black',
                         borderStyle= '2px solid white',
                         borderHoverStyle='2px solid black',
                         borderRadius='0px',
                         width = '100px',
                         padding='5px',
                         fontSize='15px',
                         fontWeight='none',
                         onClick,
                         height='50px'
                     }) => {

    const [hovered, setHovered] = useState(false)

    let style =
        hovered ? {color: hoverTextColor, backgroundColor: hoverColor, border: borderHoverStyle} : {
            color: textColor,
            backgroundColor: buttonColor,
            border: borderStyle,

        }

        const handleClick = () => {
            onClick?.();
        }

    return (
        <button type={"button"} className={"button-class"}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{fontWeight, fontSize, padding, width, borderRadius, height,...style}}
                onClick={handleClick}
        > {name}
        </button>
    );
};

export default ButtonClass;