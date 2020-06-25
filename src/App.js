import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { SetUp } from './pages/SetUp';
import { Initial } from './pages/Initial';
import { PassForm } from './pages/PassForm';
let homePage = Initial;
if (typeof localStorage.getItem('keyStore') === 'string') {
    homePage = Home;
} else {
    homePage = Initial;
}
console.log(typeof localStorage.getItem('keyStore') === 'string');
console.log(localStorage.getItem('keyStore'));
console.log(homePage);
class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route path="/setup" component={SetUp} />
                        <Route path="/password" component={PassForm} />
                        <Route component={homePage} />;
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
