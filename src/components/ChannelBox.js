import React from 'react';
import '../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from "./IconButton";
import {faGear} from "@fortawesome/free-solid-svg-icons";

const ChannelBox = ({name}) => {

    return (
        <div className={"p-0 m-3 d-flex"}
             style={{height: "20px", justifyContent:"space-between"}}>
            <div className={"d-inline-block"}>
                <p className={"group-name"}
                   style={{
                       textOverflow: "ellipsis",
                       overflow: "hidden",
                       whiteSpace: "nowrap",
                       width: "140px",
                       margin: 0,
                       padding: 0
                   }}>
                    {name}
                </p>
            </div>

            <div className={"m-0 p-0"} style={{width: "20px"}}>
                <IconButton icon={faGear} style={{color: "#cecece", height: "20px", width: "20px", float: "right"}}
                            onClick={null}/>
                {/*<IconButton icon={} style={} className={} onClick={null} hoverStyle={} />*/}
            </div>
        </div>
    );
};

export default ChannelBox;