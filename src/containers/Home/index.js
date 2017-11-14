import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeText, testProxy } from 'redux/modules/info';
import './home.scss';
import img2G from './2G.png';
import img3G from './3G.jpg';
import { Button } from 'antd';
import { PlayerBar } from 'components';
import moment from 'moment';

@connect(state => ({ text: state.info.text }), { changeText, testProxy })
export default class Home extends Component {
    static propTypes = {
        text: PropTypes.any,
        changeText: PropTypes.func,
        testProxy: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            min: 0,
            max: moment('2017-11-23').diff(moment('2017-10-23'), 'days'),
            value: 0,
            startDate: '2017-10-23',
            endDate: '2017-11-23',
            pause: true
        };
        this.time = null;
    }

    componentDidMount() {
        this.test();
    }

    sleep = () => {
        return new Promise(resolve => {
            setTimeout(resolve, 5000);
        });
    };

    test = async() => {
        await this.sleep();
        console.log('aa');
    };

    go = () => {
        this.time = setInterval(() => {
            const value = this.state.value + 1;
            if (value > this.state.max) {
                this.stop();
                this.setState({ pause: true });
            } else {
                this.setState({ value, pause: false });
            }
        }, 1000);
    };

    stop = (cb) => {
        clearInterval(this.time);
        if (cb) cb();
    };

    changeTime = () => {
        const { startDate, endDate } = this.state;
        this.setState({
            max: moment(endDate).diff(moment(startDate), 'days')
        });
    };

    render() {
        return (
            <div>
                <div style={{ width: '600px' }}>
                    <PlayerBar
                        min={this.state.min}
                        max={this.state.max}
                        value={this.state.value}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        pause={this.state.pause}
                        changeFrameCb={({ pause, value }) => {
                            this.setState({
                                pause, value
                            });
                            if (pause) {
                                this.stop();
                            } else {
                                this.stop(this.go);
                            }
                        }}
                        playControlCb={({ pause }) => {
                            this.setState({ pause });
                            if (pause) {
                                this.stop();
                            } else {
                                this.go();
                            }
                        }}
                        startDateChange={(a, startDate) => {
                            this.setState({ startDate }, this.changeTime);
                        }}
                        endDateChange={(a, endDate) => {
                            this.setState({ endDate }, this.changeTime);
                        }}
                        stopCb={() => {
                            this.stop();
                            this.setState({
                                value: 0,
                                pause: true
                            });
                        }}
                    />
                </div>
                {this.props.text || 'home'}
                <Button
                    type={'primary'}
                    icon={'search'}
                >
                    double kill
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
                        // this.props.testProxy().then(() => {
                        // });
                    }}
                />
            </div>
        );
    }
}
