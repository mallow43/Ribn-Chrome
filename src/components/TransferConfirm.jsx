import React from 'react';
import Copy from './copyFull';
import { Message, Button, Segment, Icon, Grid, Header, Modal } from 'semantic-ui-react';

export default class Confirm extends React.Component {
    render() {
        return (
            <Modal.Content>
                {this.props.error && <Message negative>{String(this.props.error.message)}</Message>}

                <Segment vertical>
                    <Grid columns="equal" verticalAlign="middle">
                        <Grid.Column textAlign="center">
                            <Copy
                                elem={this.props.params.sender[0].substr(0, 5) + '...'}
                                text={this.props.params.sender[0]}
                            />
                        </Grid.Column>

                        <Grid.Column width={2} centered size="large">
                            <Icon name="angle double right" />
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <Copy elem={this.props.params.recipient.substr(0, 5) + '...'} text={this.props.recipient} />
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment vertical>
                    <Header as="h2">
                        <Header.Content>
                            {this.props.params.amount}
                            <Header.Subheader>Amount to Send</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Segment>

                {Object.entries(this.props.params).forEach(function (param) {
                    if (param[0] === 'assetCode' || param[0] === 'issuer' || param[0] === 'fee') {
                        return (
                            <Segment vertical>
                                <Header as="h3" disabled floated="right">
                                    {param[1]}
                                </Header>
                                <Header as="h3" floated="left" style={{ float: 'none' }}>
                                    {param[0]}
                                </Header>
                            </Segment>
                        );
                    }
                })}
                <Segment vertical>
                    <Button.Group widths={10} size="large">
                        <Button primary onClick={this.props.handleSubmit}>
                            Confirm
                        </Button>
                        <Button.Or />
                        <Button onClick={() => this.props.cancelClick(false)}>Cancel</Button>
                    </Button.Group>
                </Segment>
            </Modal.Content>
        );
    }
}
