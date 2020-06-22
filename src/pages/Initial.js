import React from 'react';
import { IconHeader as StartPage } from '../components/IconHeader';
import styled from 'styled-components';
const Styles = styled.div`
    &&& {
        .content {
            padding: 1.2vw;
        }
        .button {
            margin: 1.2vw;
        }
    }
`;

export const Initial = () => {
    return (
        <Styles>
            <StartPage
                header="Welcome To Ribbon"
                subHeader="Topl Phrase"
                buttonText="Get Started"
                buttonUrl="setup"
                icon="paper plane"
            />
        </Styles>
    );
};
