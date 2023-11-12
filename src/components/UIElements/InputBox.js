import React from 'react';
import styled from "styled-components";

const SettingInput = styled.input`
  font-size: 25px;
  font-family: "JetBrains Mono", serif;
  max-width: 400px;

  color: ${({disabled}) => disabled ? 'gray' : 'white'};
  background: rgba(0, 0, 0, 0.5);

  border: 2px solid #BC2CC9;

  &:focus {
    outline: none;
  }
`

const InputBox = (props) => {
    return (
        <SettingInput {...props}></SettingInput>
    );
};

export default InputBox;