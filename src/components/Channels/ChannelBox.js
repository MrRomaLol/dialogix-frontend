import React from 'react';
import '../../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from "../Icon/IconButton";
import {faGear} from "@fortawesome/free-solid-svg-icons";

const ChannelBox = ({name}) => {


    const handleChannelSettings = () => {

    }

    return (
        <div className={"p-0 m-3 d-flex"}
             style={{justifyContent:"space-between"}}>
            <div className={"d-inline-block"}>
                <p className={"group-name mb-1"}
                   style={{
                       textOverflow: "ellipsis",
                       overflow: "hidden",
                       whiteSpace: "nowrap",
                       width: "130px",
                       margin: 0,
                       padding: 0
                   }}>
                    {name}
                </p>
            </div>

            <div className={"m-0 p-0 d-flex"} style={{alignSelf:"center"}}>
                <IconButton icon={faGear} style={{color: "#cecece", height: "20px", width: "20px"}}
                            onClick={handleChannelSettings}/>
                {/*<IconButton icon={} style={} className={} onClick={null} hoverStyle={} />*/}
            </div>
        </div>
    );
};

export default ChannelBox;