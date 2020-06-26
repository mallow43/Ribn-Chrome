/* global BramblJS */
import React from 'react';
import { Form, Button, Modal, Header, Segment } from 'semantic-ui-react';
import muBrambl from 'mubrambl';
import styled from 'styled-components';
const keyStore = JSON.parse(localStorage.getItem('keyStore'));
const Styles = styled.div`
    .ui.button.primary {
        margin-top: 10px !important;
    }

    #JSON {
        overflow: auto !important;
        height: 80vh;
    }
`;
const Styles1 = styled.div`
    #JSON {
        overflow: auto !important;
    }
`;
class CreateAssetsForm extends React.Component {
    state = {
        issuer: keyStore.publicKeyId,
        recipient: '',
        fee: 0,
        amount: 0,
        params: {},
        password: '',
        submitted: false,
        res: '',
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { issuer, recipient, fee, amount, password, assetId, submitted, res } = this.state;
        let params = {
            issuer: issuer,
            assetCode: 'test-' + Date.now(),
            recipient: recipient,
            amount: Number(amount),
            fee: Number(fee),
        };

        if (this.props.transfer) {
            params = {
                issuer: issuer,
                assetCode: 'test-' + assetId,
                recipient: recipient,
                amount: Number(amount),
                sender: [recipient],
                fee: Number(fee),
            };
        }
        const reqParams = JSON.parse(localStorage.getItem('chainProvider'));
        const brambljs = new BramblJS({
            Requests: {
                url: reqParams.requests.url,
                apiKey: reqParams.requests.headers['x-api-key'],
            },
            KeyManager: {
                password: password,
                keyStore: keyStore,
            },
        });
        brambljs.transaction(this.props.method, params).then(function (res) {
            localStorage.setItem('res', JSON.stringify(res));
        });

        const re = localStorage.getItem('res');

        const responseFormat = JSON.stringify(JSON.parse(re), null, '\t');

        this.setState({ res: responseFormat });

        this.setState({ submitted: true });

        this.setState({ params: params });
    };

    render() {
        if (!this.state.submitted) {
            const { fee, amount, issuer, recipient, password, assetId } = this.state;
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Issuer Key (Your Key)</label>
                        <Form.Input
                            placeholder="Issuer Key"
                            name="issuer"
                            value={issuer}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient Key</label>
                        <Form.Input
                            placeholder="Recipient Key"
                            name="recipient"
                            value={recipient}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    {this.props.transfer && (
                        <Form.Field>
                            <label>Asset Id</label>
                            <Form.Input
                                placeholder="Enter the asset Id of the asset you owuld like to transfer"
                                name="assetId"
                                value={assetId}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                    )}
                    <Form.Field>
                        <label>Password</label>
                        <Form.Input
                            placeholder="Eneter Your Password to unlock your keymanager"
                            name="password"
                            type="password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <label>Amount</label>
                            <Form.Input
                                name="amount"
                                type="number"
                                value={amount}
                                placeholder="Fee"
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Fee</label>
                            <Form.Input
                                name="fee"
                                type="number"
                                value={fee}
                                placeholder="Fee"
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                    </Form.Group>
                    ;
                    <Form.Field>
                        <Button primary>Submit</Button>
                    </Form.Field>
                </Form>
            );
        } else {
            const { res } = this.state;
            return (
                <React.Fragment>
                    <Styles>
                        <Header>Successful Transaction</Header>
                        <pre id="JSON" className="ui segment tertiary">
                            {res}
                        </pre>
                    </Styles>
                </React.Fragment>
            );
        }
    }
}
class CreateAssetsFormOuterComponent extends React.Component {
    render() {
        return (
            <Styles>
                <Modal trigger={<Button primary>{this.props.method}</Button>} closeIcon>
                    <Modal.Header>{this.props.method}</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <CreateAssetsForm method={this.props.method} transfer={this.props.transfer} />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </Styles>
        );
    }
}
export default CreateAssetsFormOuterComponent;
