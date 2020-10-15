/* global BramblJS */

import React from 'react';
import ParamsForm from './ParamsForm';
import TransferConfirm from './TransferConfirm';
import { Loader, Segment, Dimmer, Modal } from 'semantic-ui-react';
const keyStore = JSON.parse(localStorage.getItem('keyStore'));

export default class MainTransForm extends React.Component {
    state = {
        formState: 0,
        formArr: [
            { title: 'Recipient Key', type: 'text', name: 'recipient' },
            { title: 'Password', type: 'password', name: 'password' },
            { title: 'Sender', type: 'text', name: 'sender' },
        ],
        loading: true,
    };

    handleChange = (e, { name, value }) => {
        console.log(value);
        console.log(name);
        let formArr = this.state.formArr;
        if (name === 'Asset') {
            if (value === 'assets') {
                formArr.push({ title: 'AssetCode', type: 'text', name: 'assetCode' });
                console.log(formArr);
            } else {
                formArr.forEach(function (form) {
                    if (form.name === 'issuer' || form.name === 'assetCode') {
                        formArr.splice(formArr.indexOf(form));
                    }
                });
            }
        }
        this.setState({ formArr: formArr });

        this.setState({ [name]: value });
    };
    resolve = async (method) => {
        const reqParams = JSON.parse(localStorage.getItem('chainProvider'));
        let response;
        console.log(reqParams);

        try {
            let brambljs = new BramblJS({
                Requests: {
                    url: reqParams.requests.url,
                    apiKey: reqParams.requests.headers['x-api-key'],
                },
                KeyManager: {
                    password: this.state.password,
                    keyStore: keyStore,
                },
            });
            // new Promise(()=>
            // )
            console.log(brambljs);
            console.log(this.state.params);
            await brambljs.transaction(method, this.state.params).then(function (res) {
                response = res;
                console.log(res);
            });
            console.log(response);

            console.log(response);
            this.setState({ transResp: response });
        } catch (e) {
            console.log(e);
            console.log('e');
            this.setState({ error: e });
        }
        if (!this.state.error) {
            this.props.transModal(false);
        }
    };
    handleSubmit = () => {
        console.log(this.state);
        const { recipient, fee, amount, sender, assetDets, Asset } = this.state;
        let params;
        if (this.state.formState === 0) {
            this.setState({ formState: this.state.formState + 1 });

            if (Asset === 'assets') {
                params = {
                    issuer: assetDets.issuer,
                    assetCode: assetDets.assetCode,
                    recipient: recipient,
                    amount: Number(amount),
                    sender: [sender],
                    fee: Number(fee),
                };
                console.log(params);
            } else {
                params = {
                    recipient: recipient,
                    amount: Number(amount),
                    sender: [sender],
                    fee: Number(fee),
                };
            }
            this.setState({ params: params });
        }

        if (this.state.formState === 1) {
            if (this.state.Asset === 'assets') {
                this.resolve('transferAssetsPrototype');
            }
            if (this.state.Asset === 'polys') {
                this.resolve('transferPolys');
            }
            if (this.state.Asset === 'arbits') {
                this.resolve('transferArbits');
            }
        }
    };

    render() {
        //  const { issuer, recipient, fee, amount, password, assetId, loading, formState } = this.state;
        const { formState } = this.state;
        if (formState === 0) {
            console.log('|||||');
            console.log(this.props.response);
            return (
                <ParamsForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    formArr={this.state.formArr}
                    response={this.props.response.Boxes.Asset}
                    error={this.state.error}
                    type={this.state.Asset}
                />
            );
        }

        if (formState === 1) {
            return (
                <TransferConfirm
                    handleSubmit={this.handleSubmit}
                    params={this.state.params}
                    cancelClick={this.props.transModal}
                    type={this.state.Asset}
                    error={this.state.error}
                />
            );
        }
        if (formState === 2) {
            return <p>{JSON.stringify(this.state.transResp)}</p>;
        }
    }
}
