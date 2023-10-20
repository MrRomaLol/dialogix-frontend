import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const CardContainer = styled.div`
  height: 100px;
  width: 400px;

  margin-bottom: 30px;

  position: relative;
`

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(61, 38, 84, 0.2);

  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%);

  display: flex;


  color: white;
  font-size: 30px;
`

const CardBorder = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(188, 44, 201, 0.62);

  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%, 0 0,
  2px 2px, 2px calc(100% - 2px), calc(100% - 50px) calc(100% - 2px), calc(100% - 2px) calc(100% - 50px), calc(100% - 2px) 2px, 2px 2px)
`

const FriendCard = ({nick}) => {
    return (
        <CardContainer>
            <CardBack>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    height: "100%",
                    alignItems: "center"
                }}>
                    <div style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        backgroundColor: "gray",
                        marginRight: "10px",
                        marginLeft: "10px"
                    }}>
                    </div>
                    {nick}
                </div>
                <FontAwesomeIcon icon={faSliders} style={{color: "#C087D4", marginRight: "10px", marginTop: "10px"}}/>
            </CardBack>
            <CardBorder/>
        </CardContainer>
    )
};

export default FriendCard;