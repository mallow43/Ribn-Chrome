/* global BramblJS */
import React from 'react';
import { Button, Checkbox, Form, Segment, Header, Container } from 'semantic-ui-react';
import * as Brambl from 'mubrambl';
import { Layout } from '../components/Layout';

export class PassForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            password: '',
        };
    }
    onChange(event) {
        if (event.target.value === 'Custom RPC') {
            alert('Custom SetUp');
        }
        this.setState({ password: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.password);
        const brambljs = new BramblJS(this.state.password);
        const keyStorage = brambljs.keyManager.getKeyStorage();
        localStorage.setItem('keyStore', JSON.stringify(keyStorage));
        const requestModule = BramblJS.Requests('http://localhost:9085/', 'topl_the_world!');
        localStorage.setItem('requests', JSON.stringify(requestModule));
        this.props.history.push('/index.html');
    }

    render() {
        return (
            <Layout>
                <Container text>
                    <Segment>
                        <Header id="header" size="huge">
                            Please Enter a Password to Encrypt Your KeyStore
                        </Header>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>New Password</label>
                                <input
                                    onChange={this.onChange}
                                    required
                                    minLength="8"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="New Password"
                                    value={this.state.password}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox required label="I agree to the Terms and Conditions" />
                            </Form.Field>
                            <Button type="submit">Submit</Button>
                        </Form>
                    </Segment>
                </Container>
            </Layout>
        );
    }
}
