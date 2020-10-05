/* global BramblJS */
import React from 'react';
import { Button, Checkbox, Form, Segment, Header, Container } from 'semantic-ui-react';
import { Layout } from '../components/Layout';

export class PassForm extends React.Component {
    state = {
        password: '',
        loading: false,
    };

    onChange = (event) => {
        if (event.target.value === 'Custom RPC') {
            alert('Custom SetUp');
        }
        this.setState({ password: event.target.value });
    };
    setLoading = (l) => {
        this.setState({ loading: l });
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        this.setLoading(true);
        const pass = this.state.password;
        new Promise(() =>
            setTimeout(() => {
                let brambljs = new BramblJS(pass);
                const keyStorage = brambljs.keyManager.getKeyStorage();
                localStorage.setItem('keyStore', JSON.stringify(keyStorage));

                let requestModule = BramblJS.Requests('http://localhost:9085/', 'topl_the_world!');

                localStorage.setItem('requests', JSON.stringify(requestModule));

                const request = {
                    requests: BramblJS.Requests('http://localhost:9085/', 'topl_the_world!'),
                    name: 'Localhost 9085',
                };
                localStorage.setItem('chainProvider', JSON.stringify(request));
                this.setLoading(false);
                this.props.history.push('/index.html');
            }, 1),
        );
    };

    render() {
        let { password, loading } = this.state;
        console.log(loading);
        return (
            <Layout>
                <Container text>
                    <Segment id="home">
                        <Header id="header" size="huge">
                            Please Enter a Password to Encrypt Your KeyStore
                        </Header>

                        <p>{String(loading)}</p>

                        <Form onSubmit={this.handleSubmit.bind(this)} loading={loading}>
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
                                    value={password}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox required label="I agree to the Terms and Conditions" />
                            </Form.Field>
                            <Button primary type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Segment>
                </Container>
            </Layout>
        );
    }
}
