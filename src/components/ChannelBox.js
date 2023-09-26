import React from 'react';
import '../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from "./IconButton";
import {faGear} from "@fortawesome/free-solid-svg-icons";

const ChannelBox = ({name}) => {

    return (
        <div className={"p-0 m-3 d-inline-block"}
             style={{justifyContent: "space-between", flexDirection:"column", height: "20px", maxWidth: "168px"}}>
            <div style={{maxWidth: "140px"}}>
                <p className={"group-name"}
                   style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>
                    {name}
                </p>
            </div>

            <div className={"m-0 p-0"} style={{maxWidth:"20px"}}>
                <IconButton icon={faGear} style={{color: "#cecece", height:"20px", width:"20px"}} onClick={null}/>
                {/*<IconButton icon={} style={} className={} onClick={null} hoverStyle={} />*/}
            </div>
        </div>
    );
};

export default ChannelBox;