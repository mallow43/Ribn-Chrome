import React from 'react';

import { List, Modal } from 'semantic-ui-react';

class Assets extends React.Component {
    render() {
        const { resp } = this.props;
        console.log(this.props);
        let Assets = resp.Boxes.Asset;
        console.log(Assets);
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
                                                if (
                                                    pair[0] === 'data' ||
                                                    pair[0] === 'assetCode' ||
                                                    pair[0] === 'type'
                                                ) {
                                                    return;
                                                }
                                                if (pair[1].length > 20) {
                                                    pair[1] = pair[1].substr(0, 5) + '...';
                                                }
                                                return (
                                                    <List.Item>
                                                        <List.Content floated="right">
                                                            <List.Description as="p">
                                                                {String(pair[1])}
                                                            </List.Description>
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
    }
}
export default Assets;
