import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`

const ContentBack = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(61, 38, 84, 0.2);
  clip-path: polygon(50px 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%, 0 50px);
`

const ContentBorder = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(188, 44, 201, 0.62);
  clip-path: polygon(50px 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%, 0 50px, 50px 0,
  50px 2px, 50px 2px, 2px 50px, 2px calc(100% - 2px), calc(100% - 50px) calc(100% - 2px), calc(100% - 2px) calc(100% - 50px), calc(100% - 2px) 2px, 50px 2px);
`

const ContentContainer = ({children, className}) => {
    return (
        <Container className={className}>
            <ContentBack>
                {children}
            </ContentBack>
            <ContentBorder/>
        </Container>
    );
};

export default ContentContainer;