import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const IconButton = ({icon, onClick, className = ""}) => {

    const handleClick = () => {
        onClick?.();
    }

    return (
        <FontAwesomeIcon icon={icon} onClick={handleClick} className={className}/>
    );
};

export default IconButton;