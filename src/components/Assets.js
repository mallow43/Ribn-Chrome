/* global BramblJS */

import React from 'react';
import { Header, Icon, Button, Form } from 'semantic-ui-react';
import muBrambl from 'mubrambl';
import styled from 'styled-components';
const Styles = styled.div`
    #JSON {
        overflow: auto !important;
        height: 80vh;
    }
`;
const keyStore = JSON.parse(localStorage.getItem('keyStore'));

class Assets extends React.Component {
    constructor() {
        super();
        const reqParams = JSON.parse(localStorage.getItem('chainProvider'));
        const requests = BramblJS.Requests(reqParams.requests.url, reqParams.requests.headers['x-api-key']);
        requests.getBalancesByKey({ publicKeys: [keyStore.publicKeyId] }).then(function (res) {
            localStorage.setItem('res', JSON.stringify(res));
        });

        const re = localStorage.getItem('res');
        const responseFormat = JSON.stringify(JSON.parse(re), null, '\t');
        this.state = {
            key: keyStore.publicKeyId,
            res: responseFormat,
        };
    }

    render() {
        const { res } = this.state;
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
