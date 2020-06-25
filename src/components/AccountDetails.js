import React from 'react';
import { Header, Icon, Button } from 'semantic-ui-react';
import copy from './copy';

class AccountDetails extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        copy(this.props.keyStore.publicKeyId);
    }
    render() {
        return (
            <Header as={this.props.header} icon textAlign="center">
                <Icon name="user" circular />
                <Header.Content>Account 1</Header.Content>
                <Button primary>Details</Button>
                <Button onClick={this.handleSubmit} size="mini">
                    <Icon name="copy" />
                    {this.props.keyStore.publicKeyId.substr(0, 5) + '...'}
                </Button>
            </Header>
        );
    }
}
export default AccountDetails;