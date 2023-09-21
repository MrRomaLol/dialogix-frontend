import React from 'react';
const LineOr = ({name}) => {

    return (
        <div style={{height: "25px", display: "flex"}}>
            <div style={{height: "5px", width: "40%", backgroundColor:"#fff", alignSelf:"center"}} />
            <div style={{textAlign: "center", width: "20%", color: "#fff", fontSize:"23px", alignSelf:"center"}}>{name}</div>
            <div style={{height: "5px", width: "40%", backgroundColor:"#fff", justifyContent: "center", alignSelf:"center"}} />
        </div>
    );
};

export default LineOr;