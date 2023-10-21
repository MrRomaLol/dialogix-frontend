import React from 'react';
import styled from "styled-components";
import ContentContainer from "../components/ContentContainer";
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";

const StyledAppContent = styled(AppContent)`
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  width: 450px;
  height: 600px;
`

const LoginPage = () => {
    return (
        <React.Fragment>
            <AppBackground/>
            <StyledAppContent>
                <Container>
                    <ContentContainer>

                    </ContentContainer>
                </Container>
            </StyledAppContent>
        </React.Fragment>
    );
};

export default LoginPage;