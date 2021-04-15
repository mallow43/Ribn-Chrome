import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import QRCode from 'qrcode.react';
import Copy from './copyFull';
import ExportKeyForm from './exportForm';
export default class AccountDetails extends React.Component {
    state = {
        keyStore: JSON.parse(localStorage.getItem('keyStore')),
        stage: 'main',
    };
    setStage = (arg) => {
        this.setState({ stage: arg });
    };
    render() {
        if (this.state.stage === 'main') {
            return (
                <Header as="h1" id="m" icon textAlign="center">
                    <Copy
                        elem={
                            <div>
                                <QRCode className="ui  centered segment" value={this.state.keyStore.publicKeyId} />
                                <Button size="mini" id="active" active>
                                    {this.state.keyStore.publicKeyId.substr(0, 10) + '...'}
                                </Button>
                            </div>
                        }
                        text={this.state.keyStore.publicKeyId}
                    />

                    <Header.Content>Account 1</Header.Content>

                    <div>
                        <Button size="large" primary onClick={() => this.setStage('export')}>
                            Export Key Phrase
                        </Button>
                        <Button size="large" primary onClick={() => this.setStage('main')}>
                            View on Etherscan
                        </Button>
                    </div>
                </Header>
            );
        } else if (this.state.stage === 'export') {
            return <ExportKeyForm />;
        }
    }
}
