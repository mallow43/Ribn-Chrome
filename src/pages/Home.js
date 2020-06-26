/* global BramblJS */
import React from 'react';
import {
    Grid,
    Segment,
    Header,
    Icon,
    Button,
    Dropdown,
    Sidebar,
    Menu,
    Responsive,
    Container,
    Modal,
} from 'semantic-ui-react';
import NetworkDropdown from '../components/NetworkDropdown';
import Assets from '../components/Assets';
import AccountDetails from '../components/AccountDetails';
import CreateAssetsForm from '../components/TransactionForm.js';
import muBrambl from 'mubrambl';
import styled from 'styled-components';
const Styles = styled.div`
    margin: 0;
    padding: 0;
    #sidebar {
        background-color: aliceblue;
    }
    #sidebar2 {
        background-color: aliceblue;
        height: 100vh;
        overflow: hidden !important;
        margin: 0;
    }
    ${'' /* .segment {
        height: 40vh;
    } */}
    button.ui.button {
        display: block;
        margin: 20px auto;
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
    #transaction {
        margin: 20px !important;
    }

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
    }
`;
const networkOptions = [
    {
        key: 'Localhost 9085',
        text: 'Localhost 9085',
        value: 'Localhost 9085',
    },
    {
        key: 'Custom RPC',
        text: 'Custom RPC',
        value: 'Custom RPC',
    },
];
const keyStore = JSON.parse(localStorage.getItem('keyStore'));

export class Home extends React.Component {
    constructor() {
        super();
        if (window.innerWidth <= 992) {
            this.state = {
                network: 'Localhost 9085',
                visible: false,
            };
        } else {
            this.state = {
                network: 'Localhost 9085',
                visible: false,
            };
        }

        this.handleToggle = this.handleToggle.bind(this);
        this.handlePusher = this.handlePusher.bind(this);
    }

    handleToggle = () => {
        this.setState({ visible: !this.state.visible });
    };
    handlePusher = () => {
        // const { visible } = this.state;
        if (this.state.visible) this.setState({ visible: false });
    };
    render() {
        const { value } = this.state.network;

        return (
            <Container>
                <Styles>
                    <NetworkDropdown />
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar
                            as={Segment}
                            animation="overlay"
                            // onHide={() => setVisible(false)}
                            overflow="hidden"
                            vertical
                            visible={this.state.visible}
                            width="thin"
                            id="sidebar2"
                        >
                            <Icon name="close" onClick={this.handlePusher} />
                            <AccountDetails header="h3" keyStore={keyStore} />
                        </Sidebar>
                        <Sidebar.Pusher>
                            <Responsive as={Menu} borderless fixed="top" maxWidth={992}>
                                <Menu.Item onClick={this.handleToggle}>
                                    <Icon name="sidebar" />
                                </Menu.Item>
                            </Responsive>

                            <Grid>
                                <Grid.Column only="tablet computer" id="sidebar" width="6">
                                    <AccountDetails header="h1" keyStore={keyStore} />
                                </Grid.Column>

                                <Grid.Column width="10">
                                    <Header as="h1">Ribbon Chrome</Header>
                                    <Modal
                                        trigger={
                                            <Button id="transaction" primary>
                                                Initiate a Transaction
                                            </Button>
                                        }
                                        closeIcon
                                    >
                                        <Modal.Header>Select a Transaction Method</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                <CreateAssetsForm transfer={false} method="createAssetsPrototype" />
                                                <CreateAssetsForm transfer={true} method="transferAssetsPrototype" />
                                            </Modal.Description>
                                        </Modal.Content>
                                    </Modal>
                                    <Modal
                                        trigger={
                                            <Button id="transaction" primary>
                                                View your assets
                                            </Button>
                                        }
                                        closeIcon
                                    >
                                        <Modal.Header>View your assets</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                <Assets />
                                            </Modal.Description>
                                        </Modal.Content>
                                    </Modal>
                                </Grid.Column>
                            </Grid>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </Styles>
            </Container>
        );
    }
}
