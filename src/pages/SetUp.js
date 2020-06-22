import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { IconHeader } from '../components/IconHeader';
import styled from 'styled-components';

const Styles = styled.div`
    .segment {
        height: 40vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    margin-top: -5vh;
`;
export const SetUp = () => (
    <Styles>
        <Grid columns={2} relaxed="very" align="center" stackable>
            <Grid.Column>
                <Segment>
                    <IconHeader
                        header="No, I Have a Keystore"
                        buttonText="Import KeyStore"
                        buttonUrl="form"
                        icon="cloud upload"
                    />
                </Segment>
            </Grid.Column>

            <Grid.Column verticalAlign="middle">
                <Segment>
                    <IconHeader
                        header="Create Wallet"
                        buttonText="Generate KeyStore"
                        buttonUrl="password"
                        icon="plus"
                    />
                </Segment>
            </Grid.Column>
        </Grid>
    </Styles>
);
