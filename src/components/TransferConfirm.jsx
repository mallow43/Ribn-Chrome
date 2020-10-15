import React from 'react';
import Copy from './copyFull';
import { Message, Button, Segment, Icon, Grid, Header, Modal } from 'semantic-ui-react';

export default class Confirm extends React.Component {
    render() {
        return (
            <Modal.Content>
                {this.props.error && <Message negative>{String(this.props.error.message)}</Message>}
                {this.props.params.sender && (
                    <Segment vertical>
                        <Grid columns="equal" verticalAlign="middle">
                            <Grid.Column textAlign="center">
                                <Copy
                                    elem={this.props.params.sender[0].substr(0, 5) + '...'}
                                    text={this.props.params.sender[0]}
                                />
                            </Grid.Column>

                            <Grid.Column width={2} size="large">
                                <Icon name="angle double right" />
                            </Grid.Column>
                            <Grid.Column textAlign="center">
                                <Copy
                                    elem={this.props.params.recipient.substr(0, 5) + '...'}
                                    text={this.props.recipient}
                                />
                            </Grid.Column>
                        </Grid>
                    </Segment>
                )}

                <Segment vertical>
                    <Header as="h2">
                        <Header.Content>
                            {this.props.params.amount}
                            <Header.Subheader>Amount to Send</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Segment>
                {!this.props.params.sender && (
                    <Segment vertical>
                        <Header as="h5" disabled floated="right">
                            <Copy
                                elem={this.props.params.recipient.substr(0, 10) + '...'}
                                text={this.props.params.recipient}
                            />
                        </Header>
                        <Header as="h5" floated="left" style={{ float: 'none' }}>
                            Recipient
                        </Header>
                    </Segment>
                )}
                {
                    // eslint-disable-next-line array-callback-return
                    Object.entries(this.props.params).map((param) => {
                        if (param[0] === 'assetCode' || param[0] === 'issuer' || param[0] === 'fee') {
                            let long = param[1];
                            if (param[1].length > 15) {
                                long = param[1].substr(0, 10) + '...';
                            }
                            return (
                                <Segment vertical key={Object.entries(this.props.params).indexOf(param)}>
                                    <Header as="h5" disabled floated="right">
                                        <Copy elem={long} text={param[1]} />
                                    </Header>
                                    <Header as="h5" floated="left" style={{ float: 'none' }}>
                                        {param[0]}
                                    </Header>
                                </Segment>
                            );
                        }
                    })
                }
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
