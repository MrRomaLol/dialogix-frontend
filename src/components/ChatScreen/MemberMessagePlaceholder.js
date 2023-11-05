import React from 'react';
import {MemberMessageBack, MemberMessageContainer} from "./MemberMessage";
import Skeleton from "react-loading-skeleton";

const MemberMessagePlaceholder = ({width, height}) => {
    return (
        <MemberMessageContainer>
            <Skeleton circle width={50} height={50}/>
            <div style={{display: "flex", flexDirection: "column"}}>
                <MemberMessageBack>
                    <Skeleton width={width || 100 } height={height || 20}/>
                </MemberMessageBack>
            </div>
        </MemberMessageContainer>
    );
};

export default MemberMessagePlaceholder;