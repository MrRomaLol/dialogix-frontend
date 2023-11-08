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

  color: white;
  background: transparent;

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
                    <Setting Name={'Nicnname'}/>
                    <Setting Name={'Username'}/>
                    <Setting Name={'Email'}/>
                    <PasswordChange/>
                </ChangeSettingsBox>

                <UserTagBox>
                    <ContentContainer>

                    </ContentContainer>
                </UserTagBox>

            </SettingsBox>

        </React.Fragment>
    );
};

export default MyAccount;