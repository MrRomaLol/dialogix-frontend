import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {faMoon} from "@fortawesome/free-solid-svg-icons";

const Online = () => {
    return (
        <div className={"rounded-circle status-circle"} style={{backgroundColor: "green"}}>

        </div>
    )
}
const Away = () => {
    return (
        <div className={"status-circle"} style={{height: "18px", width: "18px"}}>
            <FontAwesomeIcon icon={faMoon} style={{height:"100%", width:"100%",color: "#f5dc24", transform:"rotate(-20deg)"}} />
        </div>
    )
}
const Dnd = () => {
    return (
        <div className={"rounded-circle status-circle"} style={{backgroundColor: "red"}}>
            <div className={"rounded-circle"} style={{
                backgroundColor: "darkred",
                height: "8.5px",
                width: "8.5px",
                textAlign: "center",
                alignItems: "center"
            }}>

            </div>
        </div>
    )
}
const Offline = () => {
    return (
        <div className={"rounded-circle status-circle"} style={{backgroundColor: "grey"}}>
            <div className={"rounded-circle"} style={{
                backgroundColor: "#3d3a3a",
                width: "8.5px",
                height: "8.5px",
            }}/>
        </div>
    )
}
const UserBox = ({
                     image,
                     username = "username",
                     activity,
                 }) => {

    let status;

    if (activity === "online") {
        status = <Online/>
    } else if (activity === "away") {
        status = <Away/>
    } else if (activity === "dnd") {
        status = <Dnd/>
    } else {
        status = <Offline/>
    }

    return (
        <div className={"user-box p-0 m-3"}>
            <div style={{width: "48px", height: "48px", position: "relative"}}>
                <div className={"rounded-circle clip"}
                     style={{width: "48px", height: "48px", backgroundColor: "rgba(0,0,0,0.4)"}}>
                    <div style={{
                        color: "white", width: "48px",
                        height: "48px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>{username.substring(0, 1)}</div>
                </div>
                {status}
            </div>

            <div className={"d-flex"} style={{width:"100%", whiteSpace:"nowrap",}}>
                <p className={"username m-0 p-0 "}>{username.length > 12 ? username.substring(0, 11) + "..." : username}</p>
            </div>
        </div>
    );
};

export default UserBox;