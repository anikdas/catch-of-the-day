import React from 'react';
import { getFunName } from '../helpers';
import PropTypes from 'prop-types';

class StorePicker extends React.Component {
    myInput = React.createRef();

    static propType = {
        history: PropTypes.object,
    };

    goToStore = (event) => {
        event.preventDefault();
        console.log('Go to store');
        const storeName = this.myInput.value.value;
        this.props.history.push(`/store/${storeName}`);
    };
    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please select a store</h2>
                <input
                    type="text"
                    ref={this.myInput}
                    required
                    defaultValue={getFunName()}
                    placeholder="store name"
                />
                <button type="submit">Visit store →</button>
            </form>
        );
    }
}

export default StorePicker;
