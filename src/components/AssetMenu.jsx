import React from 'react';
import { Loader, Message } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import AssetsDetails from './AssetsDetails';
import Arbits from './Arbits';

class Assets extends React.Component {
    state = {
        resp: [],
        loading: false,
        clicked: false,
        error: false,
    };

    componentDidMount() {
        this.props.resolve();
    }
    clicked = (section) => {
        this.setState({ clicked: true });

        this.setState({ clickedComponent: this.props.resp[section][0] });
    };

    render() {
        const { clickedComponent } = this.state;
        const { error, resp, response } = this.props;

        if (error) {
            return (
                <React.Fragment>
                    <Message negative>{String(error)}</Message>
                </React.Fragment>
            );
        }

        if (clickedComponent === 'Assets') {
            return <AssetsDetails resp={response} />;
        }
        if (clickedComponent === 'Arbits') {
            return <Arbits resp={response} type="Arbit" />;
        }
        if (clickedComponent === 'Polys') {
            return <Arbits resp={response} type="Poly" />;
        }

        return (
            <React.Fragment>
                <div>
                    {!this.props.loading && (
                        <List divided verticalAlign="middle">
                            {resp.map((pair) => (
                                <List.Item
                                    onClick={() => this.clicked(resp.indexOf(pair))}
                                    className="pointer"
                                    key={resp.indexOf(pair)}
                                >
                                    <List.Content floated="right">
                                        <List.Description as="p">{pair[1]}</List.Description>
                                    </List.Content>
                                    <List.Header id="list-header" as="p">
                                        {pair[0]}
                                    </List.Header>
                                </List.Item>
                            ))}
                        </List>
                    )}
                    {this.props.loading && (
                        <div>
                            <br />
                            <br />
                            <Loader active={this.props.loading} inline="centered" />
                            <br />
                            <br />
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}
export default Assets;
