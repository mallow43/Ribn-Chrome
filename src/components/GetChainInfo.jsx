/* global BramblJS */

import React from 'react';
import { Message } from 'semantic-ui-react';
import styled from 'styled-components';
import { Header, Table } from 'semantic-ui-react';

const Styles = styled.div`
    #JSON {
        overflow: auto !important;
        height: 80vh;
    }
    #table {
        width: 100%;
    }
`;

export default class GetChainInfo extends React.Component {
    constructor(props) {
        super();
        this.resolve = this.resolve.bind(this);
        this.state = { resp: [] };
    }
    setLoading = () => {
        this.setState({ loading: !this.state.loading });
    };
    resolve = async () => {
        this.setLoading();
        const reqParams = JSON.parse(localStorage.getItem('chainProvider'));
        const requests = BramblJS.Requests(reqParams.requests.url, reqParams.requests.headers['x-api-key']);
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
        this.setLoading();

        this.setState({ resp: Object.entries(response) });
    };
    componentDidMount = () => {
        this.resolve();
    };
    render() {
        const { error, resp } = this.state;
        if (error) {
            return (
                <React.Fragment>
                    <Styles>
                        <Message negative>{String(error)}</Message>
                    </Styles>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <Styles>
                    <Table fixed id="table" basic="very" singleLine celled collapsing>
                        <Table.Body>
                            {/* <p>{res}</p> */}
                            {resp.map((pair) => (
                                <Table.Row key={resp.indexOf(pair)}>
                                    <Table.Cell>
                                        <Header as="h4" image>
                                            <Header.Content>{pair[0]}</Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{String(pair[1])}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Styles>
            </React.Fragment>
        );
    }
}
