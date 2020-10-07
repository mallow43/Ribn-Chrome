/* global BramblJS */

import React from 'react';
import { Loader, Message } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import AssetsDetails from './AssetsDetails';
import Arbits from './Arbits';

const keyStore = JSON.parse(localStorage.getItem('keyStore'));

class Assets extends React.Component {
    state = {
        resp: [],
        loading: false,
        clicked: false,
    };

    setLoading = () => {
        this.setState({ loading: !this.state.loading });
    };
    resolve = async () => {
        const reqParams = JSON.parse(localStorage.getItem('chainProvider'));
        const requests = BramblJS.Requests(reqParams.requests.url, reqParams.requests.headers['x-api-key']);
        let response;
        this.setLoading();

        try {
            await requests.getBalancesByKey({ publicKeys: [keyStore.publicKeyId] }).then(function (res) {
                let key = keyStore.publicKeyId;
                response = res.result[key];
                return res;
            });
        } catch (e) {
            console.warn(e);
            this.setState({ error: e });
        }
        this.setLoading();
        let asset;
        if (response.Boxes.Asset === undefined) {
            asset = 0;
        } else {
            asset = Object.entries(response.Boxes.Asset).length;
        }
        let arr = [
            ['Polys', response.Balances.Polys],
            ['Arbits', response.Balances.Arbits],
            ['Assets', asset],
        ];

        this.setState({
            resp: arr,
            response: response,
        });
    };
    componentDidMount() {
        this.resolve();
    }
    clicked = (section) => {
        this.setState({ clicked: true });

        this.setState({ clickedComponent: this.state.resp[section][0] });
    };

    render() {
        const { error, resp, clickedComponent } = this.state;
        if (error) {
            return (
                <React.Fragment>
                    <Message negative>{String(error)}</Message>
                </React.Fragment>
            );
        }

        if (clickedComponent === 'Assets') {
            return <AssetsDetails resp={this.state.response} />;
        }
        if (clickedComponent === 'Arbits') {
            return <Arbits resp={this.state.response} type="Arbit" />;
        }
        if (clickedComponent === 'Polys') {
            return <Arbits resp={this.state.response} type="Poly" />;
        }

        return (
            <React.Fragment>
                <div>
                    <List divided verticalAlign="middle">
                        {resp.map((pair) => (
                            <List.Item
                                onClick={() => this.clicked(resp.indexOf(pair))}
                                className="pointer"
                                key={resp.indexOf(pair)}
                            >
                                <List.Content floated="right">
                                    <List.Description as="p">{pair[1]}</List.Description>
                                </List.Content>
                                <List.Header id="list-header" as="p">
                                    {pair[0]}
                                </List.Header>
                            </List.Item>
                        ))}
                    </List>
                    {this.state.loading && (
                        <div>
                            <br />
                            <br />
                            <Loader active={this.state.loading} inline="centered" />
                            <br />
                            <br />
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}
export default Assets;
