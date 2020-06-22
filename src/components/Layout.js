import React from 'react';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';
const PaddedDiv = styled.div`
    &&&&&&& {
        padding-top: 15vh;
        justify-content: center;
    }
`;
export const Layout = (props) => {
    return (
        <PaddedDiv>
            <Container>{props.children}</Container>
        </PaddedDiv>
    );
};
