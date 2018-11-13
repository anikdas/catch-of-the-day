import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
    <nav className="login">
        <button className="github" onClick={() => props.authenticate('Github')}>
            Login with Github
        </button>

        <button
            className="twitter"
            onClick={() => props.authenticate('Twitter')}
        >
            Login with Twitter
        </button>

        <button
            className="facebook"
            onClick={() => props.authenticate('Facebook')}
        >
            Login with Facebook
        </button>
    </nav>
);

Login.propTypes = {
    authenticate: PropTypes.func.isRequired,
};

export default Login;
