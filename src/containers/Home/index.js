import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeText, testProxy } from 'redux/modules/info';
import './home.scss';
import img2G from './2G.png';
import img3G from './3G.jpg';
import { Button } from 'antd';

@connect(state => ({ text: state.info.text }), { changeText, testProxy })
export default class Home extends Component {
    static propTypes = {
        text: PropTypes.any,
        changeText: PropTypes.func,
        testProxy: PropTypes.func
    };

    render() {
        return (
            <div>
                {this.props.text || 'home'}
                <Button
                    type={'primary'}
                    icon={'search'}
                >
                    fjjfsdfdsj
                </Button>
                <img src={img2G} />
                <img src={img3G} />
                <div className="aa" />
                <div className="bb" />
                <input
                    className="input"
                    type="text"
                    onInput={(e) => {
                        this.props.changeText(e.target.value);
                        this.props.testProxy().then(() => {

                        });
                    }}
                />
            </div>
        );
    }
}
