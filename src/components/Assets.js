/* global BramblJS */

import React from 'react';
// eslint-disable-next-line
import muBrambl from 'mubrambl';
import { Message } from 'semantic-ui-react';
import styled from 'styled-components';

const Styles = styled.div`
    #JSON {
        overflow: auto !important;
        height: 80vh;
    }
`;
const keyStore = JSON.parse(localStorage.getItem('keyStore'));

class Assets extends React.Component {
    constructor(props) {
        super(props);
        this.resolve = this.resolve.bind(this);

        this.componentWillMount = this.componentDidMount.bind(this);
    }
    resolve = async () => {
        const reqParams = JSON.parse(localStorage.getItem('chainProvider'));
        const requests = BramblJS.Requests(reqParams.requests.url, reqParams.requests.headers['x-api-key']);
        let response;
        try {
            if (this.props.chainInfo) {
                await requests.chainInfo().then(function (res) {
                    response = res;
                    return res;
                });
            }
            if (this.props.getAssets) {
                await requests.getBalancesByKey({ publicKeys: [keyStore.publicKeyId] }).then(function (res) {
                    response = res;
                    return res;
                });
            }
        } catch (e) {
            console.warn(e);
            this.setState({ error: e });
        }

        this.setState({ res: JSON.stringify(response, null, 2) });
    };
    componentDidMount() {
        let response;

        this.resolve();

        const responseFormat = JSON.stringify(response, null, 2);
        this.setState({
            key: keyStore.publicKeyId,
            res: responseFormat,
        });
    }
    render() {
        const { res, error } = this.state;
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
                    <pre id="JSON" className="ui segment tertiary">
                        {res}
                    </pre>
                </Styles>
            </React.Fragment>
        );
    }
}
export default Assets;
