import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Layout } from './components/Layout';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Layout>
                        <Switch>
                            <Route component={Home} />;
                        </Switch>
                    </Layout>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
