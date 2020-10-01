import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import Assets from './Assets';
export default class MenuExampleSecondaryPointing extends Component {
    state = { activeItem: 'assets' };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item name="assets" active={activeItem === 'assets'} onClick={this.handleItemClick} />
                    <Menu.Item name="chain info" active={activeItem === 'chain info'} onClick={this.handleItemClick} />
                    <Menu.Item name="activity" active={activeItem === 'activity'} onClick={this.handleItemClick} />
                </Menu>

                <Segment>{/* <Assets/> */}</Segment>
            </div>
        );
    }
}
