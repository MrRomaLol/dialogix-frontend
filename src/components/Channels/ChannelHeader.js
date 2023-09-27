import React from 'react';
import IconButton from "../Icon/IconButton";

const ChannelHeader = ({
                           name,
                       }) => {


    const headers = [
        {name: "Header 1"},
        {name: "Header 2"},
        {name: "Header 3"},
        {name: "Header 4"},
        {name: "Header 5"},
        {name: "Header 6"},
    ]

    return (
        <div className={"d-flex justify-content-sm-between m-3"}>
            <div className={""} style={{width: "140px"}}>
                <IconButton/>
                {headers.map((obj) => (<div><p>{obj.name}</p></div>))}
            </div>
            <div className={"m-0 p-0 d-flex"} style={{alignSelf: "center"}}>

                {/*<IconButton icon={} style={} className={} onClick={null} hoverStyle={} />*/}
            </div>
        </div>
    );
};

export default ChannelHeader;