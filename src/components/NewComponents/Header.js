import React from 'react';
import {useTheme} from "../../theme";

const Header = () => {
    const theme = useTheme();

    const style = {
        back: {
            width: "100%",
            height: "100px",
            display: "flex",
            justifyContent: "center"
        },

        mainStyle: {
            backgroundColor: theme.headerBackground,
        },

        left: {
            height: "40px",
            borderRadius: "0 0 0 30px",
            width: "30%"
        },

        center: {
            height: "100%",
            borderRadius: "0 0 30px 30px",
            display: "flex",
            flexDirection: "row",
            padding: "0 20px 0 20px",
            alignItems: "center"
        },

        right: {
            height: "40px",
            borderRadius: "0 0 30px 0",
            width: "30%"
        }

    }

    const circleThing = {
        height: "80px",
        width: "80px",
        borderRadius: "50%",
        backgroundColor: "white",
        margin: "5px 10px 5px 10px"
    }

    return (
        <div style={style.back}>
            <div style={{...style.mainStyle, ...style.left}}></div>
            <div style={{...style.mainStyle, ...style.center}}>
                <div style={circleThing}/>
                <div style={circleThing}/>
                <div style={circleThing}/>
            </div>
            <div style={{...style.mainStyle, ...style.right}}></div>
        </div>
    );
};

export default Header;