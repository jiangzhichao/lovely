import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './app.scss';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.object,
    };

    static contextTypes = {
        store: PropTypes.object
    };

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
