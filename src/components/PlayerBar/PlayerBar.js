/**
 * Created by jiang on 2017/10/19.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PlayerBar.scss';
import { Slider, DatePicker, Icon } from 'antd';
import moment from 'moment';

export default class PlayerBar extends Component {
    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        pause: PropTypes.bool,
        playControlCb: PropTypes.func,
        value: PropTypes.number,
        startDate: PropTypes.any,
        startDateChange: PropTypes.func,
        endDate: PropTypes.any,
        endDateChange: PropTypes.func,
        changeFrameCb: PropTypes.func,
        stopCb: PropTypes.func
    };

    render() {
        return (
            <div className="player-content">
                <DatePicker
                    allowClear={false}
                    style={{ width: '100px' }}
                    value={moment(this.props.startDate)}
                    onChange={this.props.startDateChange}
                />
                {' ~ '}
                <DatePicker
                    allowClear={false}
                    style={{ width: '100px' }}
                    value={moment(this.props.endDate)}
                    onChange={this.props.endDateChange}
                />
                <Icon
                    type="step-backward"
                    onClick={() => {
                        const newValue = this.props.value - 1;
                        this.props.changeFrameCb({
                            pause: true,
                            value: newValue < 0 ? 0 : newValue
                        });
                    }}
                />
                {this.props.pause && <Icon
                    type="play-circle"
                    onClick={() => {
                        this.props.playControlCb({
                            pause: !this.props.pause
                        });
                    }}
                />}
                {!this.props.pause && <Icon
                    type="pause-circle"
                    onClick={() => {
                        this.props.playControlCb({
                            pause: !this.props.pause
                        });
                    }}
                />}
                <Icon
                    type="step-forward"
                    onClick={() => {
                        const newValue = this.props.value + 1;
                        this.props.changeFrameCb({
                            pause: true,
                            value: newValue > this.props.max ? this.props.max : newValue
                        });
                    }}
                />
                <div
                    className="player-stop"
                    onClick={this.props.stopCb}
                />
                <Slider
                    value={this.props.value}
                    min={this.props.min}
                    max={this.props.max}
                    onChange={(e) => {
                        this.props.changeFrameCb({
                            pause: false,
                            value: e
                        });
                    }}
                    tipFormatter={e => moment(this.props.startDate).add(e, 'days').format('YYYY-MM-DD')}
                />
                <span
                    className="player-value"
                >
                    {moment(this.props.startDate).add(this.props.value, 'days').format('YYYY-MM-DD')}
                </span>
            </div>
        );
    }
}
