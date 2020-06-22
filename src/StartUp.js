import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { SetUp } from './pages/SetUp';
import { Initial } from './pages/Initial';
import { Layout } from './components/Layout';
import { PassForm } from './pages/PassForm';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/setup" component={SetUp} />
                            <Route path="/password" component={PassForm} />
                            <Route component={Initial} />;
                        </Switch>
                    </Layout>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
