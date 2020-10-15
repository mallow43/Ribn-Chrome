/* global BramblJS */

import React from 'react';
import { Grid, Segment, Header, Icon, Button, Sidebar, Menu, Responsive, Container, Modal } from 'semantic-ui-react';
import NetworkDropdown from '../components/NetworkDropdown';
import Assets from '../components/Assets';
import AccountDetails from '../components/AccountDetails';
import TransactionForm from '../components/TransactionFormMain.jsx';
import styled from 'styled-components';
import InfoMenu from '../components/InfoMenu';
const Styles = styled.div`
    margin: 0;
    padding: 0;
    #sidebar {
        background-color: #f4fcfb;
    }

    #sidebar2 {
        background-color: #f4fcfb;
        height: 100vh;
        overflow: hidden !important;
        margin: 0;
    }

    button.ui.button {
        display: block;
        margin: 20px auto;
    }

    div.ten.wide.column {
        padding-right: 25px;
    }
    .header {
        padding: 20px !important;
    }
    button.ui.mini {
        padding: 3px;
    }
    .pusher {
        max-width: 100%;
        margin: 0;
    }

    .ui.segment {
        padding: 0;
    }
    .blankSegment {
        background: white;
    }
    .dropdown {
        margin-bottom: 10px !important;
    }
    .ui.menu {
        border-bottom: 0 none !important;
        box-shadow: none;
    }
    ${'' /* #transaction {
        margin-right: 20px !important;
    } */}

    &&&& {
        i.icon.copy {
            margin: 0.2em;
            font-size: inherit;
            display: inline;
        }

        .pushable {
            margin: 0;
            height: 100%;
            overflow: hidden;
        }
        .pushable {
            width: 100%;
        }
        i.sidebar.icon {
            font-size: 1.5em;
        }
    }
`;
const keyStore = JSON.parse(localStorage.getItem('keyStore'));

export class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            network: 'Localhost 9085',
            visible: false,
            resp: [],
            loading: false,
            clicked: false,
            error: false,
            transModalActive: false,
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handlePusher = this.handlePusher.bind(this);
    }
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
        let arr;
        let asset;
        if (this.state.error || response === undefined) {
            arr = [['Polys', 0][('Arbits', 0)][('Assets', 0)]];
        } else {
            if (response.Boxes.Asset === undefined) {
                asset = 0;
            } else {
                asset = Object.entries(response.Boxes.Asset).length;
            }
            arr = [
                ['Polys', response.Balances.Polys],
                ['Arbits', response.Balances.Arbits],
                ['Assets', asset],
            ];
        }

        this.setState({
            resp: arr,
            response: response,
        });
    };
    setLoading = () => {
        this.setState({ loading: !this.state.loading });
    };
    transModal = (state) => {
        this.setState({ transModalActive: state });
    };
    handleToggle = () => {
        this.setState({ visible: !this.state.visible });
    };
    handlePusher = () => {
        // const { visible } = this.state;
        if (this.state.visible) this.setState({ visible: false });
    };
    render() {
        return (
            <div id="bendy-background">
                <div id="bendy-corners">
                    <Container>
                        <Styles>
                            <NetworkDropdown />
                            <Sidebar.Pushable as={Segment} id="home">
                                <Sidebar
                                    as={Segment}
                                    animation="push"
                                    // onHide={() => setVisible(false)}
                                    overflow="hidden"
                                    vertical
                                    visible={this.state.visible}
                                    // width="thin"
                                    id="sidebar2"
                                >
                                    <Icon name="close" id="side" onClick={this.handlePusher} />
                                    <AccountDetails header="h2" keyStore={keyStore} />
                                </Sidebar>
                                <Sidebar.Pusher dimmed={this.state.visible}>
                                    <Responsive as={Menu} borderless fixed="top" maxWidth={992}>
                                        <Menu.Item onClick={this.handleToggle}>
                                            <Icon name="sidebar" />
                                        </Menu.Item>
                                    </Responsive>

                                    <Grid stackable>
                                        <Grid.Column only="tablet computer" id="sidebar" width="6">
                                            <AccountDetails header="h1" keyStore={keyStore} />
                                        </Grid.Column>

                                        <Grid.Column width="10">
                                            <Header as="h1">Ribn-Chrome</Header>
                                            <Modal
                                                onClose={() => this.transModal(false)}
                                                onOpen={() => this.transModal(true)}
                                                trigger={
                                                    <Button
                                                        onClick={() => this.transModal(true)}
                                                        fluid
                                                        id="transaction"
                                                        primary
                                                    >
                                                        Transfer An Asset
                                                    </Button>
                                                }
                                                closeIcon
                                                open={this.state.transModalActive}
                                            >
                                                {/* <Modal.Header>Enter Recipient Key</Modal.Header> */}
                                                {/* <Modal.Content> */}
                                                {/* <Modal.Description>
                                                <CreateAssetsForm transfer={false} method="createAssetsPrototype" />
                                                <CreateAssetsForm transfer={true} method="transferAssetsPrototype" />
                                            </Modal.Description> */}
                                                <TransactionForm
                                                    response={this.state.response}
                                                    transModal={this.transModal}
                                                />
                                                {/* </Modal.Content> */}
                                            </Modal>
                                            <Modal
                                                trigger={
                                                    <Button fluid id="transaction" primary>
                                                        View your assets
                                                    </Button>
                                                }
                                                closeIcon
                                            >
                                                <Modal.Header>View your assets</Modal.Header>
                                                <Modal.Content>
                                                    <Modal.Description>
                                                        <Assets getAssets />
                                                    </Modal.Description>
                                                </Modal.Content>
                                            </Modal>
                                            <Modal
                                                trigger={
                                                    <Button fluid id="transaction" primary>
                                                        Get Chain Info
                                                    </Button>
                                                }
                                                closeIcon
                                            >
                                                <Modal.Header>Chain Info</Modal.Header>
                                                <Modal.Content>
                                                    <Modal.Description>
                                                        <Assets chainInfo />
                                                    </Modal.Description>
                                                </Modal.Content>
                                            </Modal>
                                            <InfoMenu
                                                resolve={this.resolve}
                                                loading={this.state.loading}
                                                response={this.state.response}
                                                resp={this.state.resp}
                                                error={this.state.error}
                                            />
                                        </Grid.Column>
                                    </Grid>
                                </Sidebar.Pusher>
                            </Sidebar.Pushable>
                        </Styles>
                    </Container>
                </div>
            </div>
        );
    }
}
