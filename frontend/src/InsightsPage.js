import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMoods } from './redux/actions';
import { getOrderedMoodHistory } from './redux/selectors';
import MoodEntry from './MoodEntry';

class InsightsPage extends Component {

    componentDidMount() {
        this.props.dispatch(getMoods());
    }

    render() {
        return (
            <div>
                <div>
                    <ol>
                    {this.props.orderedHistory.map(history => (
                        <MoodEntry key={history.id} {...history}/>
                    ))}
                    </ol>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return getOrderedMoodHistory(state);
}

export default connect(mapStateToProps)(InsightsPage);