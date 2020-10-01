import React from 'react';
import { IconHeader as StartPage } from '../components/IconHeader';
import styled from 'styled-components';
import { Layout } from '../components/Layout';

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
        <Layout>
            <Styles>
                <StartPage
                    header="Welcome To Ribbon"
                    subHeader="Topl Phrase"
                    buttonText="Get Started"
                    buttonUrl="setup"
                    icon="paper plane"
                    svg
                />
            </Styles>
        </Layout>
    );
};
