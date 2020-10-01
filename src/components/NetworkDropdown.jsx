/* global BramblJS */
import React from 'react';
import { Dropdown, Modal } from 'semantic-ui-react';
import NetworkForm from './NetworkForm';
let networkOptions = [
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
        var requestsObj = {
            key: requests.name,
            text: requests.name,
            value: requests.name,
        };

        let key = [];
        networkOptions.forEach(function (obj) {
            key.push(obj.value);
        });
        if (!key.includes(requestsObj.value)) {
            networkOptions.push(requestsObj);
        }

        this.state = {
            network: requests.name,
            value: requests.name,
            open: false,
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event, { value }) {
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

            this.setState({ network: 'Localhost 9085', value: 'Localhost 9085' });
        }
    }
    close = () => {
        const requests = JSON.parse(localStorage.getItem('chainProvider'));

        this.setState({ open: false });
        this.setState({ network: requests.name, value: requests.name });
        let key = [];
        networkOptions.forEach(function (obj) {
            key.push(obj.value);
        });
        var requestsObj = {
            key: requests.name,
            text: requests.name,
            value: requests.name,
        };
        if (!key.includes(requestsObj.value)) {
            networkOptions.push(requestsObj);
        }
    };

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
                            <NetworkForm onSubmit={this.close} />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </React.Fragment>
        );
    }
}
export default NetworkDropdown;
