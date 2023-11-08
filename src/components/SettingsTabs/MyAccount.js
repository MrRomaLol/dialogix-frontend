import React from 'react';
import {SettingTabName} from "./SettingsParts";
import styled from "styled-components";
import CutButton from "../UIElements/CutButton";
import ContentContainer from "../ContentContainer";

const SettingsBox = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 50px;
  
  box-sizing: border-box;
`

const ChangeSettingsBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const UserTagBox = styled.div`
  
`

const SettingName = styled.p`
  font-size: 25px;
  font-family: Furore, serif;
  text-indent: 15px;
  margin-bottom: 10px;
  color: white;
`

const SettingInput = styled.input`
  font-size: 25px;
  font-family: "JetBrains Mono", serif;
  padding: 10px;
  max-width: 400px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: 2px solid #BC2CC9;

  &:hover {
    outline: none;
  }

  &:active {
    outline: none;
  }

`

const Setting = ({Name}) => {
    return <div style={{marginBottom: '40px'}}>
        <SettingName>{Name}</SettingName>
        <SettingInput placeholder={Name}></SettingInput>
    </div>
}


const PasswordChange = () => {
    return <div style={{}}>
        <SettingName> Password </SettingName>
        <br/>
        <CutButton children={'Change Password'} width={300}/>
    </div>
}

const MyAccount = () => {
    return (
        <React.Fragment>
            <SettingTabName>My Account</SettingTabName>

            <SettingsBox>

                <ChangeSettingsBox>
                    <Setting Name={'Nickname'}/>
                    <Setting Name={'Username'}/>
                    <Setting Name={'Email'}/>
                    <PasswordChange/>
                </ChangeSettingsBox>

                <UserTagBox>
                    <ContentContainer backgroundColor={"rgba(0, 0, 0, 0.5)"}>
                        <div style={{display: "flex", justifyContent: "center", padding: "30px"}}>
                            <div style={{height: "100px", width: "100px", borderRadius: "50%", backgroundColor: "#CA71D2", marginRight: "50px"}}/>
                            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around",fontFamily: "JetBrains Mono, serif", fontSize: "17px", color: "#A684DF",marginRight:"50px"}}>
                                <div>
                                    Nickname
                                </div>
                                <div>
                                    Username
                                </div>
                            </div>
                        </div>
                    </ContentContainer>
                </UserTagBox>

            </SettingsBox>

        </React.Fragment>
    );
};

export default MyAccount;