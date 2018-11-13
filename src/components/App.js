import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {},
    };

    static propTypes = {
        match: PropTypes.object,
    };

    componentDidMount() {
        console.log('MOUNTED!!!');
        const { params } = this.props.match;
        const localStorateRef = localStorage.getItem(`${params.storeId}`);
        if (localStorateRef) {
            this.setState({ order: JSON.parse(localStorateRef) });
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes',
        });
    }

    componentDidUpdate() {
        console.log('it updated!!!');
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        const fishes = { ...this.state.fishes };
        fishes[`fish${Date.now()}`] = fish;
        this.setState({ fishes });
    };

    updateFish = (key, updatedFish) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = updatedFish;
        this.setState({ fishes });
    };

    deleteFish = (key) => {
        let fishes = { ...this.state.fishes };
        fishes[key] = null;
        this.setState({ fishes });
    };

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = (key) => {
        let order = { ...this.state.order };
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    };

    removeFromOrder = (key) => {
        let order = { ...this.state.order };
        delete order[key];
        this.setState({ order });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Catch of the day" age={500} cool={true} />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map((key) => (
                            <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                            />
                        ))}
                    </ul>
                </div>

                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />

                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    loadSampleFishes={this.loadSampleFishes}
                    deleteFish={this.deleteFish}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        );
    }
}

export default App;
