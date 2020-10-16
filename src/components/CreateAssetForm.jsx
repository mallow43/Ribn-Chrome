import React from 'react';
import { Form, Button, Modal } from 'semantic-ui-react';

export default class Params extends React.Component {
    render() {
        const { loading } = this.props;

        return (
            <Modal.Content>
                <Form loading={loading} onSubmit={this.props.handleSubmit}>
                    <Form.Field>
                        <label>Issuer</label>
                        <Form.Input name="issuer" type="text" placeholder="Issuer" onChange={this.props.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Form.Input
                            name="recipient"
                            type="text"
                            placeholder="Recipient"
                            onChange={this.props.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Form.Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={this.props.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Asset Code</label>
                        <Form.Input
                            name="assetCode"
                            type="text"
                            placeholder="Asset Code"
                            onChange={this.props.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Group>
                            <Form.Field>
                                <label>Amount</label>
                                <Form.Input
                                    name="amount"
                                    type="number"
                                    placeholder="Fee"
                                    onChange={this.props.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Fee</label>
                                <Form.Input
                                    name="fee"
                                    type="number"
                                    placeholder="Fee"
                                    onChange={this.props.handleChange}
                                />
                            </Form.Field>
                        </Form.Group>
                    </Form.Field>

                    <Button primary>Submit</Button>
                </Form>
            </Modal.Content>
        );
    }
}
