import React, {useState} from 'react';

const GroupIcon = ({
                    image = "",
                    groupName = "Group name",
                    isNotificated, isSelected
                   }) => {

    let visibility = "hidden";
    let height;

    const [isHovered, setIsHovered] = useState(false);

    if (isSelected) {
        height = "80px"
        visibility = "visible"
    } else if (isHovered) {
        height = "50px"
        visibility = "visible"
    } else if (isNotificated) {
        height = "10px"
        visibility = "visible"
    }



    return (
        <div className={"group-icon"}>
            <div className={"notification-line p-0 m-0"} style={{height, visibility}}>

            </div>

            <div className={"image-group"}>
                <img src={image} alt={groupName} className={"group-image rounded-5"}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                />
            </div>

            <div className={"box-group-name"}>
                <div className={"p-2"}>{groupName}</div>
            </div>
        </div>
    );
};

export default GroupIcon;