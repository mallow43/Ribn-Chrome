/* global BramblJS */
import React from 'react';
import { Dropdown, Modal } from 'semantic-ui-react';
import * as Brambl from 'mubrambl';
import NetworkForm from './NetworkForm';
const networkOptions = [
    {
        key: 'Localhost 9085',
        text: 'Localhost 9085',
        value: 'Localhost 9085',
    },
    {
        key: 'Valhalla',
        text: 'Valhalla',
        value: 'Valhalla',
    },
    {
        key: 'Custom RPC',
        text: 'Custom RPC',
        value: 'Custom RPC',
    },
];

class NetworkDropdown extends React.Component {
    constructor() {
        super();
        const requests = JSON.parse(localStorage.getItem('chainProvider'));
        this.state = {
            network: requests.name,
            value: requests.name,
            open: false,
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event, { value }) {
        console.log(value);
        if (value === 'Custom RPC') {
            this.setState({ open: true });
        }
        if (value === 'Valhalla') {
            const request = {
                requests: BramblJS.Requests('https://valhalla.torus.topl.co/', 'Ku6v7NUyFFFkhqN5'),
                name: 'Valhalla',
            };
            localStorage.setItem('chainProvider', JSON.stringify(request));
            this.setState({ network: 'Valhalla', value: 'Valhalla' });
        }

        if (value === 'Localhost 9085') {
            const request = {
                requests: BramblJS.Requests('http://localhost:9085/', 'topl_the_world!'),
                name: 'Localhost 9085',
            };
            localStorage.setItem('chainProvider', JSON.stringify(request));
            console.log(request);

            this.setState({ network: 'Localhost 9085', value: 'Localhost 9085' });
        }
    }
    close = () => this.setState({ open: false });

    render() {
        const { value, open, network } = this.state;
        return (
            <React.Fragment>
                <Dropdown
                    placeholder={network}
                    value={value}
                    onChange={this.onChange}
                    fluid
                    selection
                    options={networkOptions}
                />
                <Modal closeIcon open={open} onClose={this.close}>
                    <Modal.Header>Configure Network</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <NetworkForm />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </React.Fragment>
        );
    }
}
export default NetworkDropdown;
