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
        const requests = BramblJS.Requests('http://localhost:9085/', 'topl_the_world!');
        requests.getBalancesByKey({ publicKeys: [keyStore.publicKeyId] }).then(function (res) {
            localStorage.setItem('res', JSON.stringify(res));
        });

        const re = localStorage.getItem('res');
        global.re = localStorage.getItem('res');
        const responseFormat = JSON.stringify(JSON.parse(re), null, '\t');
        this.state = {
            key: keyStore.publicKeyId,
            res: responseFormat,
        };
    }

    render() {
        const { res } = this.state;
        console.log(res);
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
