import React from 'react';
import { Grid, Segment, Header, Icon, Button } from 'semantic-ui-react';
import muBrambl from 'mubrambl';
import styled from 'styled-components';

const Styles = styled.div`
    div.six.wide.column {
        background-color: aliceblue;
    }

    button.ui.button {
        display: block;
        margin: 20px auto;
    }

    button.ui.mini {
        padding: 3px;
    }
`;
export const Home = () => {
    return (
        <Styles>
            <Segment>
                <Grid>
                    <Grid.Column width={6}>
                        <Header as="h1" icon textAlign="center">
                            <Icon name="user" circular />
                            <Header.Content>Account 1</Header.Content>
                            <Button primary>Details</Button>
                            <Button size="mini">Details</Button>
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={10}></Grid.Column>
                </Grid>
            </Segment>
        </Styles>
    );
};
