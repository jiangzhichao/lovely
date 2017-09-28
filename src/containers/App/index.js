import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LoadingBar from 'react-redux-loading-bar';
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
                <LoadingBar
                    style={{
                        backgroundColor: '#108ee9',
                        zIndex: 99999,
                        height: '2px',
                        position: 'fixed',
                        top: '0',
                        left: '0'
                    }}
                />
                {this.props.children}
            </div>
        );
    }
}
