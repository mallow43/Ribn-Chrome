import React from 'react';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Dashboard extends React.Component {
    onSubmit = (event) => {
        this.props.history.push('/' + this.props.route);
        event.preventDefault();
    };
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <Button primary>{this.props.text}</Button>
                </form>
            </div>
        );
    }
}
export default withRouter(Dashboard);
