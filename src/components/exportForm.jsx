/* global BramblJS */

import React from 'react';
import { Form, Button, Modal } from 'semantic-ui-react';

export default class exportForm extends React.Component {
    state = {
        loading: false,
        password: '',
    };
    resolve = async () => {
        this.setLoading();
        const reqParams = JSON.parse(localStorage.getItem('chainProvider'));
        const requests = BramblJS.Requests(reqParams.requests.url, reqParams.requests.headers['x-api-key']);
        // eslint-disable-next-line no-unused-vars
        let response;
        try {
            await requests.chainInfo().then(function (res) {
                response = res.result;
                return res;
            });
        } catch (e) {
            console.warn(e);
            console.log(e);
            this.setState({ error: e });
        }
    };
    handleSubmit = () => {};
    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };
    render() {
        return (
            <Modal.Content>
                <Form onSubmit={this.handleSubmit} loading={this.state.loading}>
                    <Form.Field>
                        <label>New Password</label>
                        <Form.Input
                            onChange={this.handleChange}
                            required
                            minLength="8"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="New Password"
                            value={this.state.password}
                        />
                    </Form.Field>
                    <Button primary type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Content>
        );
    }
}
