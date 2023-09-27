import React from 'react';
import UserBox from "./UserBox";
import '../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ServerName from "./ServerName";
import UserNameBox from "./UserNameBox";
import ChannelList from "./ChannelList";
import ChannelHeader from "./ChannelHeader";

const ServerScreen = () => {
    return (
        <div style={{display:"flex", flex:1}}>

            <div className={"app-channels-box"}>
                <ServerName />
                <ChannelHeader />
                <ChannelList />
                <UserNameBox />
            </div>

            <div className={"app-text-box"}>

            </div>

            <div className={"app-users-box"}>
                {/*<UserList />*/}
                <UserBox username={"GetTheNya"} activity={"away"}/>
                <UserBox username={"Ishodus"} activity={"dnd"}/>
                <UserBox username={"HybridTNTU"}/>
                <UserBox username={"9lrluk"} activity={"online"}/>
            </div>

        </div>
    );
};

export default ServerScreen;