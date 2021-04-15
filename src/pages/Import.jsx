/* global BramblJS */
import React from 'react';
import { Button, Checkbox, Form, Segment, Header, Container, TextArea, Message } from 'semantic-ui-react';
import { Layout } from '../components/Layout';

export default class PassForm extends React.Component {
    state = {
        password: '',
        loading: false,
        stage: 'mnemonicConfirmation',
        mnemonic: '',
    };

    onChange = (event) => {
        if (event.target.value === 'Custom RPC') {
            alert('Custom SetUp');
        }
        if (event.target.name === 'password') {
            this.setState({ password: event.target.value });
        }
        if (event.target.name === 'mnemonic') {
            this.setState({ mnemonic: event.target.value });
        }
    };

    setLoading = (l) => {
        this.setState({ loading: l });
    };
    switch = (l) => {
        this.setState({ stage: l });
    };
    handleSubmit = (evt) => {
        evt.preventDefault();
        this.setLoading(true);
        const pass = this.state.password;
        const mnem = this.state.mnemonic;
        new Promise(() =>
            setTimeout(() => {
                let brambljs = new BramblJS({
                    KeyManager: {
                        password: pass,
                        mnemonic: mnem,
                    },
                });
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
        let { password, loading, stage } = this.state;

        if (stage === 'mnemonicConfirmation') {
            return (
                <Layout>
                    <Container text>
                        <Segment id="home" className="padd">
                            <Header as="h2">Please enter the mnemonic of the wallet you would like to import</Header>

                            <Form>
                                <TextArea
                                    name="mnemonic"
                                    onChange={this.onChange}
                                    value={this.state.mnemonic}
                                    placeholder="Please Enter Your Mnemonic"
                                ></TextArea>
                            </Form>
                            <Button onClick={() => this.switch('password')} primary type="submit" className="marg">
                                Submit
                            </Button>
                        </Segment>
                    </Container>
                </Layout>
            );
        }
        if (stage === 'password') {
            return (
                <Layout>
                    <Container text>
                        <Segment id="home" className="padd">
                            <Header id="header" size="huge">
                                Please Enter a Password to Encrypt Your Imported KeyStore
                            </Header>

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
                            {this.state.error && (
                                <Message negative>
                                    <Message.Header>{this.state.error}</Message.Header>
                                    <p>Try Again</p>
                                </Message>
                            )}
                        </Segment>
                    </Container>
                </Layout>
            );
        }
    }
}
