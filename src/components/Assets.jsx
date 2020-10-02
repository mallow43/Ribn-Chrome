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
const keyStore = JSON.parse(localStorage.getItem('keyStore'));

class Assets extends React.Component {
    constructor(props) {
        super();
        this.resolve = this.resolve.bind(this);
        this.state = { resp: [] };
        this.componentWillMount = this.componentDidMount.bind(this);
    }
    resolve = async () => {
        const reqParams = JSON.parse(localStorage.getItem('chainProvider'));
        const requests = BramblJS.Requests(reqParams.requests.url, reqParams.requests.headers['x-api-key']);
        let response;
        try {
            if (this.props.chainInfo) {
                await requests.chainInfo().then(function (res) {
                    response = res.result;
                    return res;
                });
            }
            if (this.props.getAssets) {
                await requests.getBalancesByKey({ publicKeys: [keyStore.publicKeyId] }).then(function (res) {
                    let key = keyStore.publicKeyId;
                    response = res.result[key];
                    return res;
                });
            }
        } catch (e) {
            console.warn(e);

            this.setState({ error: e });
        }

        this.setState({ resp: Object.entries(response) });
    };
    componentDidMount() {
        this.resolve();
    }
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
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as="h4" image>
                                            <Header.Content>{pair[0]}</Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{JSON.stringify(pair[1])}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Styles>
            </React.Fragment>
        );
    }
}
export default Assets;
