import React from 'react';
import UserBox from "./UserBox";
import '../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const ServerScreen = () => {
    return (
        <div style={{display:"flex", flex:1}}>

            <div className={"app-users-box"}>
                <UserBox username={"GetTheNya"} activity={"away"}/>
                <UserBox username={"Ishodus"} activity={"dnd"}/>
                <UserBox username={"HybridTNTU"}/>
                <UserBox username={"9lrluk"} activity={"online"}/>
            </div>

            <div className={"app-text-box"}>

            </div>


        </div>
    );
};

export default ServerScreen;