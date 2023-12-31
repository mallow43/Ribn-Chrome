/* global BramblJS */
import React from 'react';
import { Button, Checkbox, Form, Segment, Header, Container, TextArea, Message } from 'semantic-ui-react';
import { Layout } from '../components/Layout';

export class PassForm extends React.Component {
    state = {
        password: '',
        loading: false,
        stage: 'password',
        keyStorage: '',
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
            let mnem = event.target.value.split(' ');
            let mnemonic = this.state.keyStorage.keyManager.mnemonic.split(' ').slice(0, mnem.length);

            // eslint-disable-next-line array-callback-return
            mnem.map((x) => {
                if (x !== mnemonic[mnem.indexOf(x)]) {
                    console.log('Incorrect Mnemonic');

                    this.setState({ error: 'Incorrect Mnemonic' });
                } else {
                    this.setState({ error: '' });
                }
            });

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
        // evt.preventDefault();
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
                // this.props.history.push('/index.html');
                this.setState({ stage: 'mnemonicCollection', keyStorage: brambljs });
            }, 1),
        );
    };
    onFinish = () => {
        console.log(';;;;');
        if (this.state.mnemonic === this.state.keyStorage.keyManager.mnemonic) {
            this.props.history.push('/index.html');
        } else {
            this.setState({ error: 'Incorrect Mnemonic' });
        }
    };
    render() {
        let { password, loading, stage, keyStorage } = this.state;
        if (stage === 'password') {
            return (
                <Layout>
                    <Container text>
                        <Segment id="home" className="padd">
                            <Header id="header" size="huge">
                                Please Enter a Password to Encrypt Your KeyStore
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
                        </Segment>
                    </Container>
                </Layout>
            );
        }
        if (stage === 'mnemonicCollection') {
            return (
                <Layout>
                    <Container text>
                        <Segment id="home" className="padd">
                            <Header as="h2">
                                Account Backup Phrase
                                <Header.Subheader>
                                    Your backup phrase makes it easy to back up and restore your account.
                                </Header.Subheader>
                            </Header>
                            <Header as="h4">
                                WARNING: Never disclose your backup phrase. Anyone with this phrase can access your
                                account.
                            </Header>
                            <Segment padded compact>
                                {keyStorage.keyManager.mnemonic}
                            </Segment>
                            <Button primary onClick={() => this.switch('mnemonicConfirmation')} className="marg">
                                Done
                            </Button>
                        </Segment>
                    </Container>
                </Layout>
            );
        }
        if (stage === 'mnemonicConfirmation') {
            return (
                <Layout>
                    <Container text>
                        <Segment id="home" className="padd">
                            <Header as="h2">Confirm you saved your mnemonic</Header>
                            <Form>
                                <TextArea
                                    name="mnemonic"
                                    onChange={this.onChange}
                                    value={this.state.mnemonic}
                                    placeholder="Please Enter Your Mnemonic"
                                ></TextArea>
                            </Form>
                            <Button onClick={() => this.onFinish()} primary type="submit" className="marg">
                                Submit
                            </Button>
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
