import React from 'react';
import {MyMessageBack, MyMessageContainer} from "./MyMessage";
import Skeleton from "react-loading-skeleton";

const MyMessagePlaceholder = ({width, height}) => {
    return (
        <MyMessageContainer>
            <div style={{display: "flex", flexDirection: "column"}}>
                <MyMessageBack>
                    <Skeleton width={width || 100} height={height || 20}/>
                </MyMessageBack>
            </div>
            <Skeleton circle width={50} height={50}/>
        </MyMessageContainer>
    );
};

export default MyMessagePlaceholder;