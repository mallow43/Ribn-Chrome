/* global BramblJS */

import React from 'react';
import { Loader, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import { List } from 'semantic-ui-react';
import AssetsPage from './AssetsDetails';
const Styles = styled.div`
    #JSON {
        overflow: auto !important;
        height: 80vh;
    }
    #table {
        width: 100%;
        margin-bottom: 30px;
    }
`;
const keyStore = JSON.parse(localStorage.getItem('keyStore'));
function PolyDetails() {
    return <p>Polys</p>;
}

function ArbitDetails() {
    return <p>Arbits</p>;
}
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
        console.log(requests);
        console.log(reqParams);
        let response;
        this.setLoading();

        try {
            await requests.getBalancesByKey({ publicKeys: [keyStore.publicKeyId] }).then(function (res) {
                console.log(res);
                let key = keyStore.publicKeyId;
                response = res.result[key];
                return res;
            });
        } catch (e) {
            console.warn(e);
            console.log(e);
            this.setState({ error: e });
        }
        console.log(response);
        this.setLoading();
        let arr = [
            ['Polys', response.Balances.Polys],
            ['Arbits', response.Balances.Arbits],
            ['Assets', response.Boxes.asset || 0],
        ];
        console.log(arr);

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

        console.log(section);
    };
    render() {
        console.log(this.state);

        const { error, resp, clicked, clickedComponent } = this.state;
        if (error) {
            return (
                <React.Fragment>
                    <Styles>
                        <Message negative>{String(error)}</Message>
                    </Styles>
                </React.Fragment>
            );
        }
        if (clicked) {
            console.log(this.state);
            if (clickedComponent === 'Assets') {
                return <AssetsPage resp={this.state.response} />;
            }
            if (clickedComponent === 'Arbits') {
                return <ArbitDetails />;
            }
            if (clickedComponent === 'Polys') {
                return <PolyDetails />;
            }
        }

        return (
            <React.Fragment>
                <Styles>
                    <div>
                        <List divided verticalAlign="middle">
                            {resp.map((pair) => (
                                <List.Item onClick={() => this.clicked(resp.indexOf(pair))} key={resp.indexOf(pair)}>
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
                </Styles>
            </React.Fragment>
        );
    }
}
export default Assets;
