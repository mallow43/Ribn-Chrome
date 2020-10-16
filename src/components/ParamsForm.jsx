import React from 'react';
import { Form, Button, Modal, Dropdown, Header } from 'semantic-ui-react';
const options = [
    { key: 1, text: 'Assets', value: 'assets' },
    { key: 2, text: 'Polys', value: 'polys' },
    { key: 3, text: 'Arbits', value: 'arbits' },
];
export default class Params extends React.Component {
    render() {
        const { loading, formArr, response } = this.props;
        let opt = [];

        console.log(response);
        if (!response) {
            return (
                <Modal.Content>
                    <Header as="h1">
                        No Assets to Transfer
                        <Header.Subheader>Go make one</Header.Subheader>
                    </Header>
                </Modal.Content>
            );
        }
        if (response) {
            // eslint-disable-next-line array-callback-return
            response.map((ass) => {
                opt.push({
                    key: response.indexOf(ass),
                    text: String(ass.assetCode),
                    description: String(ass.value),
                    value: { issuer: ass.issuer, assetCode: ass.assetCode },
                });
            });
        } else {
            opt = [{ text: 'No Assets to transfer', key: '1' }];
        }

        return (
            <Modal.Content>
                <Form loading={loading} onSubmit={this.props.handleSubmit}>
                    <Form.Field>
                        <label>Select Asset</label>
                        <Dropdown
                            onChange={this.props.handleChange}
                            options={options}
                            placeholder="Select an Asset to Transfer"
                            selection
                            fluid
                            name="Asset"
                            value={options.value}
                        />
                    </Form.Field>
                    {formArr.map((form) => {
                        if (form.name === 'assetCode') {
                            return (
                                <Form.Field key={formArr.indexOf(form)}>
                                    <label>{String(form.title)}</label>
                                    <Dropdown
                                        onChange={this.props.handleChange}
                                        options={opt}
                                        placeholder="Select an Asset to Transfer"
                                        selection
                                        fluid
                                        name="assetDets"
                                        value={opt.value}
                                    />
                                </Form.Field>
                            );
                        }
                        return (
                            <Form.Field key={formArr.indexOf(form)}>
                                <label>{String(form.title)}</label>
                                <Form.Input
                                    placeholder={form.title}
                                    name={form.name}
                                    type={form.type}
                                    onChange={this.props.handleChange}
                                />
                            </Form.Field>
                        );
                    })}
                    <Form.Field>
                        <Form.Group>
                            <Form.Field>
                                <label>Amount</label>
                                <Form.Input
                                    name="amount"
                                    type="number"
                                    placeholder="Fee"
                                    onChange={this.props.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Fee</label>
                                <Form.Input
                                    name="fee"
                                    type="number"
                                    placeholder="Fee"
                                    onChange={this.props.handleChange}
                                />
                            </Form.Field>
                        </Form.Group>
                    </Form.Field>

                    <Form.Field>
                        <Button primary>Submit</Button>
                    </Form.Field>
                </Form>
            </Modal.Content>
        );
    }
}
