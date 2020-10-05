import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import Assets from './InfoAssets';
import Activity from './InfoActivity';
export default class MenuExampleSecondaryPointing extends Component {
    state = { activeItem: 'assets' };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item name="assets" active={activeItem === 'assets'} onClick={this.handleItemClick} />
                    <Menu.Item name="activity" active={activeItem === 'activity'} onClick={this.handleItemClick} />
                </Menu>

                {/* <Segment> */}

                {this.state.activeItem === 'assets' && <Assets />}
                {this.state.activeItem === 'activity' && <Activity />}
                {/* </Segment> */}
            </div>
        );
    }
}
