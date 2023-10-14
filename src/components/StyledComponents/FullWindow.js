import React from 'react';
import styled from 'styled-components';

const Window = styled.div`
  width: 100%;
  height: 100vh;
`

const FullWindow = (props) => {
    return <Window children={props.children}/>
};

export default FullWindow;