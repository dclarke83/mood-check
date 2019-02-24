import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMoods } from './redux/actions';
import { getMoodInsights } from './redux/selectors';
import MoodEntry from './MoodEntry';
import MoodFace from './MoodFace';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class InsightsPage extends Component {

    componentDidMount() {
        this.props.dispatch(getMoods());
    }

    calcPercentage = () => {
        return ((this.props.totals.score / this.props.totals.base) * 100).toFixed(1);
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <div style={{position: 'relative', margin: '30px'}}>
                        <CircularProgressbar percentage={this.calcPercentage()}/>
                        <div style={{position: 'absolute', top: '0', left: '0', height: '100%', width: '100%'}}>
                            <div style={{display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <MoodFace perc={this.calcPercentage()} />
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', alignContent:'center', justifyContent: 'center', alignItems: 'center'}}>
                        <div style={{fontSize: '6em', fontWeight: 500 }}>
                            {this.calcPercentage()}%
                        </div>
                        <div>
                            Based on {this.props.totals.count} entries
                        </div>
                    </div>
                </div>
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
    return getMoodInsights(state);
}

export default connect(mapStateToProps)(InsightsPage);