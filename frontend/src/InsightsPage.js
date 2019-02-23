import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMoods } from './redux/actions';

class InsightsPage extends Component {

    componentDidMount() {
        this.props.dispatch(getMoods());
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default connect()(InsightsPage);