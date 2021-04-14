import React from 'react';
import { Header, Icon, Button, Modal } from 'semantic-ui-react';
import Copy from './copyFull';
import AccountDetailsModal from './AccountDetailsModal';
class AccountDetails extends React.Component {
    state = {
        keyStore: JSON.parse(localStorage.getItem('keyStore')),
        stage: 'main',
    };

    render() {
        return (
            <Header as={this.props.header} icon textAlign="center">
                <Icon name="user" circular />
                <Header.Content>Account 1</Header.Content>
                <Modal
                    trigger={<Button primary>Details</Button>}
                    size="small"
                    closeIcon
                    open={this.state.transModalActive}
                >
                    <AccountDetailsModal />
                </Modal>
                <Copy
                    elem={
                        <Button size="mini">
                            <Icon name="copy" />
                            {this.state.keyStore.publicKeyId.substr(0, 5) + '...'}
                        </Button>
                    }
                    text={this.state.keyStore.publicKeyId}
                />
            </Header>
        );
    }
}
export default AccountDetails;
