/* global BramblJS */
import React from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
class NetworkForm extends React.Component {
    state = {
        key: '',
        url: '',
        name: '',
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { key, name, url } = this.state;
        const requests = BramblJS.Requests(url, key);
        const requestsObj = {
            requests: requests,
            name: name,
        };
        console.log(requestsObj);
        localStorage.setItem('chainProvider', JSON.stringify(requestsObj));
        this.props.onSubmit();
    };
    render() {
        const { key, name, url } = this.state;
        return (
            <React.Fragment>
                <Header>Settings</Header>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Newtwork Name</label>
                        <Form.Input placeholder="Newtwork Name" name="name" value={name} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Network Url</label>
                        <Form.Input placeholder="Network Url" name="url" value={url} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>API Key</label>
                        <Form.Input placeholder="API Key" name="key" value={key} onChange={this.handleChange} />
                    </Form.Field>
                    <Button primary>Submit</Button>
                </Form>
            </React.Fragment>
        );
    }
}
export default NetworkForm;
