import React from 'react';
import UserBox from "./UserBox/UserBox";
import '../../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as PropTypes from "prop-types";
import InputChatBox from "./Modules/InputChatBox";
import ChatBox from "./ChatBox/ChatBox";
import {useTranslation} from "react-i18next";


InputChatBox.propTypes = {name: PropTypes.string};
const MainScreen = () => {
    const isSelected = false;
    const {t} = useTranslation();

    return (
        <div style={{display: "flex", flex: 1}}>

            <div className={"app-users-box"}>
                <UserBox username={"GetTheNya"} activity={"away"}/>
                <UserBox username={"Ishodus"} activity={"dnd"}/>
                <UserBox username={"HybridTNTU"}/>
                <UserBox username={"9lrluk"} activity={"online"}/>
            </div>

            {isSelected ? <ChatBox/> : <div className={"app-text-box"}>
                <p className={"m-0 p-5"} style={{
                                                    display:"flex",
                                                    color:"white",
                                                    width:"100%",
                                                    height:"100%",
                                                    alignItems:"center",
                                                    justifyContent:"center",
                                                    fontSize:"30px"
                                                }}
                >{t("mainScreen.chooseChat")}</p>
            </div>}


        </div>
    );
};

export default MainScreen;