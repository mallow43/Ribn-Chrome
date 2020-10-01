import React from 'react';
// eslint-disable-next-line no-unused-vars
import Brambl from 'mubrambl';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { SetUp } from './pages/SetUp';
import { Initial } from './pages/Initial';
import { PassForm } from './pages/PassForm';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            HomePage: Initial,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        let HomePage;

        if (typeof localStorage.getItem('keyStore') === 'string') {
            HomePage = Home;
        } else {
            HomePage = Initial;
        }
        this.setState({ HomePage: HomePage });
    }
    render() {
        const { HomePage } = this.state;
        return <HomePage />;
    }
}
class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route path="/setup" component={SetUp} />
                        <Route path="/password" component={PassForm} />
                        <Route component={HomePage} />;
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
