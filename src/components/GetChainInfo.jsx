/* global BramblJS */

import React from 'react';
import styled from 'styled-components';
import { Message, Accordion } from 'semantic-ui-react';
import CopyFull from './copyFull';
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
        let panels = [];
        let innerObjDetect = (pair) => {
            let content = String(pair[1]);
            if ((typeof pair[1] === 'object' && !Array.isArray(pair[1])) || typeof pair[1][0] === 'object') {
                let innerPanels = [];
                console.log(pair);
                if (typeof pair[1][0] === 'object') {
                    pair[1] = pair[1][0];
                }
                // eslint-disable-next-line array-callback-return
                Object.entries(pair[1]).map((p) => {
                    console.log(p);

                    let cont = innerObjDetect(p);

                    console.log(cont);
                    if (cont.length > 20) {
                        cont = cont.substr(0, 10) + '...';
                    }
                    let c = { content: <CopyFull elem={cont} text={innerObjDetect(p)} /> };
                    if (p[0] === 'txs') {
                        c = { content: cont };
                    }

                    innerPanels.push({
                        key: pair.indexOf(p),
                        title: String(p[0]),
                        content: c,
                    });
                });
                // content = <Accordion.Accordion panels={innerPanels} styled fluid />;
                content = (
                    <div>
                        <Accordion.Accordion panels={innerPanels} />
                    </div>
                );
            }
            return content;
        };
        // eslint-disable-next-line array-callback-return
        resp.map((pair) => {
            let content = innerObjDetect(pair);
            if (content.length > 20) {
                content = content.substr(0, 10) + '...';
            }
            let c = { content: <CopyFull elem={content} text={innerObjDetect(pair)} /> };
            if (pair[0] === 'bestBlock') {
                c = { content: content };
            }
            panels.push({
                key: resp.indexOf(pair),
                title: String(pair[0]),
                content: c,
            });
        });

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
                    <Accordion defaultActiveIndex={0} panels={panels} styled fluid />
                </Styles>
            </React.Fragment>
        );
    }
}
