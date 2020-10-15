import React from 'react';

import { List, Modal, HeaderSubheader } from 'semantic-ui-react';
import Copy from './copyFull';
class Assets extends React.Component {
    render() {
        const { resp } = this.props;
        let Assets = resp.Boxes.Asset;
        if (Assets) {
            return (
                <div>
                    <List divided verticalAlign="middle" id="asset-list">
                        {resp.Boxes.Asset.map((asset) => (
                            <React.Fragment>
                                <Modal
                                    trigger={
                                        <List.Item>
                                            <List.Content floated="right">
                                                <List.Description as="p">{String(asset.value)}</List.Description>
                                            </List.Content>
                                            <List.Header id="list-header" as="p">
                                                {String(asset.assetCode)}
                                            </List.Header>
                                        </List.Item>
                                    }
                                    closeIcon
                                >
                                    <Modal.Header>{String(asset.assetCode)}</Modal.Header>
                                    <Modal.Content>
                                        <Modal.Description>
                                            <List divided verticalAlign="middle" sing size="small">
                                                {Object.entries(asset).map((pair) => {
                                                    let long;

                                                    if (
                                                        pair[0] === 'data' ||
                                                        pair[0] === 'assetCode' ||
                                                        pair[0] === 'type'
                                                    ) {
                                                        // eslint-disable-next-line array-callback-return
                                                        return;
                                                    }
                                                    if (pair[1].length > 20) {
                                                        long = pair[1].substr(0, 10) + '...';
                                                    } else {
                                                        long = pair[1];
                                                    }
                                                    return (
                                                        <List.Item>
                                                            <List.Content floated="right">
                                                                <Copy
                                                                    elem={
                                                                        <List.Description as="p">
                                                                            {String(long)}
                                                                        </List.Description>
                                                                    }
                                                                    text={pair[1]}
                                                                />
                                                            </List.Content>
                                                            <List.Header id="list-header" as="p">
                                                                {String(pair[0])}
                                                            </List.Header>
                                                        </List.Item>
                                                    );
                                                })}
                                            </List>
                                            {/* <CreateAssetsForm transfer={false} method="createAssetsPrototype" />
                                            <CreateAssetsForm transfer={true} method="transferAssetsPrototype" /> */}
                                        </Modal.Description>
                                    </Modal.Content>
                                </Modal>
                            </React.Fragment>
                        ))}
                    </List>
                </div>
            );
        } else {
            return <HeaderSubheader>No Assets</HeaderSubheader>;
        }
    }
}
export default Assets;
