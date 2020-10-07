import React from 'react';
import { Form, Button } from 'semantic-ui-react';
const keyStore = JSON.parse(localStorage.getItem('keyStore'));

export default class MainTransForm extends React.Component {
    state = {
        issuer: keyStore.publicKeyId,
        recipient: '',
        fee: 0,
        amount: 0,
        params: {},
        password: '',
        submitted: false,
        res: '',
        error: undefined,
        loading: false,
    };
    handleChange = (e, { name, value }) => this.setState({ [name]: value });
    hadleSubmit = () => {
        const { issuer, recipient, fee, amount, password, assetId } = this.state;
        let params = {
            issuer: issuer,
            assetCode: 'test-' + Date.now(),
            recipient: recipient,
            amount: Number(amount),
            fee: Number(fee),
            error: false,
        };
        if (this.props.transfer) {
            params = {
                issuer: issuer,
                assetCode: assetId,
                recipient: recipient,
                amount: Number(amount),
                sender: [recipient],
                fee: Number(fee),
            };
        }
    };
    render() {
        const { issuer, recipient, fee, amount, password, assetId, loading } = this.state;

        return (
            <Form loading={loading} onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Issuer Key (Your Key)</label>
                    <Form.Input placeholder="Issuer Key" name="issuer" value={issuer} onChange={this.handleChange} />
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
                <Form.Field>
                    <Button primary>Submit</Button>
                </Form.Field>
            </Form>
        );
    }
}
