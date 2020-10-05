import React from 'react';

import { List } from 'semantic-ui-react';

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
                        <List.Item>
                            <List.Content floated="right">
                                <List.Description as="p">{String(asset.value)}</List.Description>
                            </List.Content>
                            <List.Header id="list-header" as="p">
                                {String(asset.assetCode)}
                            </List.Header>
                        </List.Item>
                    ))}
                </List>
            </div>
        );
    }
}
export default Assets;
