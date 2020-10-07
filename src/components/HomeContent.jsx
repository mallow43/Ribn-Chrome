import React from 'react';
import { Button } from 'semantic-ui-react';
import InfoMenu from '../components/InfoMenu';
import TransactionForm from './TransactionForm';
export default class HomeContent extends React.Component {
    state = { active: 'home' };
    setActive = (name) => {
        console.log(name);
        this.setState({ active: name });
    };
    render() {
        const { active } = this.state;
        if (active === 'transaction') {
            return <TransactionForm />;
        }
        if (active === 'home') {
            return (
                <div id="home-content">
                    <Button onClick={() => this.setActive('transaction')} fluid id="transaction" primary>
                        Initiate a Transaction
                    </Button>
                    <Button onClick={() => this.setActive('assets')} fluid id="transaction" primary>
                        View your assets
                    </Button>
                    <Button onClick={() => this.setActive('chainInfo')} fluid id="transaction" primary>
                        Get Chain Info
                    </Button>

                    <InfoMenu />
                </div>
            );
        }
    }
}
