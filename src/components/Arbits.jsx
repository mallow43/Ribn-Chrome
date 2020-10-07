import React from 'react';
import { List, Modal } from 'semantic-ui-react';
import Copy from './copyFull';
export default class Arbits extends React.Component {
    render() {
        let arbits = this.props.resp.Boxes[this.props.type];

        if (arbits) {
            return (
                <React.Fragment>
                    <List divided verticalAlign="middle">
                        {arbits.map((arbit) => (
                            <Modal
                                trigger={
                                    <List.Item className="pointer" key={arbits.indexOf(arbit)}>
                                        <List.Content floated="right">
                                            <List.Description as="p">{String(arbit.value)}</List.Description>
                                        </List.Content>
                                        <List.Header id="list-header" as="p">
                                            {String(arbit.id).substr(0, 10) + '...'}
                                        </List.Header>
                                    </List.Item>
                                }
                                closeIcon
                            >
                                <Modal.Header>{String(arbit.id).substr(0, 10) + '...'}</Modal.Header>
                                <Modal.Content>
                                    <Modal.Description>
                                        <List divided verticalAlign="middle" size="small">
                                            {Object.entries(arbit).map((arb) => {
                                                let long;

                                                if (arb[0] === 'data' || arb[0] === 'assetCode') {
                                                    return;
                                                }
                                                if (arb[1].length > 20) {
                                                    long = arb[1].substr(0, 10) + '...';
                                                } else {
                                                    long = arb[1];
                                                }
                                                return (
                                                    <List.Item className="pointer">
                                                        <List.Content floated="right">
                                                            <Copy
                                                                elem={
                                                                    <List.Description as="p">
                                                                        {String(long)}
                                                                    </List.Description>
                                                                }
                                                                text={arb[1]}
                                                            />{' '}
                                                        </List.Content>
                                                        <List.Header id="list-header" as="p">
                                                            {String(arb[0])}
                                                        </List.Header>
                                                    </List.Item>
                                                );
                                            })}
                                        </List>
                                    </Modal.Description>
                                </Modal.Content>
                            </Modal>
                        ))}
                    </List>
                </React.Fragment>
            );
        } else {
            return <p>No {this.props.type}s.</p>;
        }
    }
}
