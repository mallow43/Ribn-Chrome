import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import Assets from './AssetMenu';
import Activity from './Activity';
export default class InfoMenu extends Component {
    state = { activeItem: 'assets', clicked: false };

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name, clicked: !this.state.clicked });
    };
    componentDidMount = () => {
        setInterval(() => {
            this.setState({ clicked: !this.state.clicked });
        }, 30000);
    };
    render() {
        const { activeItem } = this.state;

        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item name="assets" active={activeItem === 'assets'} onClick={this.handleItemClick} />
                    <Menu.Item name="activity" active={activeItem === 'activity'} onClick={this.handleItemClick} />
                </Menu>

                {/* <Segment> */}
                {this.state.activeItem === 'assets' && <Assets key={this.state.clicked} />}
                {this.state.activeItem === 'activity' && <Activity />}
                {/* </Segment> */}
            </div>
        );
    }
}
