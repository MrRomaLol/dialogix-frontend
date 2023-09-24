import React from 'react';
import UserBox from "./UserBox";
import '../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as PropTypes from "prop-types";
import InputChatBox from "./InputChatBox";
import ChatBox from "./ChatBox";

InputChatBox.propTypes = {name: PropTypes.string};
const MainScreen = () => {
    return (
        <div style={{display: "flex", flex: 1}}>

            <div className={"app-users-box"}>
                <UserBox username={"GetTheNya"} activity={"away"}/>
                <UserBox username={"Ishodus"} activity={"dnd"}/>
                <UserBox username={"HybridTNTU"}/>
                <UserBox username={"9lrluk"} activity={"online"}/>
            </div>

            <ChatBox/>

        </div>
    );
};

export default MainScreen;