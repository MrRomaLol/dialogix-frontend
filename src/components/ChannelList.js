import React from 'react';
import '../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ChannelBox from "./ChannelBox";

const ChannelList = () => {

    const channels = [
        {name: "kedgnierbfenfeornferirigbegqwerkjgb"},
        {name: "channel"},
        {name: "channel"},
        {name: "channel"},
        {name: "channel"},
        {name: "channel"},
        {name: "channel"},
        {name: "channel"},
        {name: "channel"},
        {name: "channel"},
        {name: "channel"},
    ]

    return (
        <div>
            {channels.map((obj, index) => (
                <ChannelBox name={obj.name} key={index} />
            ))}
        </div>
    );
};

export default ChannelList;