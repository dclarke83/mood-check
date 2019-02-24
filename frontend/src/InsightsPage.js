import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getMoods } from './redux/actions';
import { getMoodInsights } from './redux/selectors';
import MoodEntry from './MoodEntry';
import MoodFace from './MoodFace';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

//#region styled-elements
const EntryList = styled.ol`
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    padding: 30px;
`;

const StatsBackground = styled.div`
    background-color: #f7f7f7;
    padding: 10px;
`;

const StatsContainer = styled.div`
    display: flex; 
    flex-direction: row;
    justify-content: space-evenly;
    margin: 10px;
    border-radius: 10px;
    background-color: #fff;
`;

const GraphContainer = styled.div`
    position: relative;
    margin: 30px;
`;

const MoodOuterPos = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
`;

const MoodInnerPos = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const NumberContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
`;
//#endregion

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
                <StatsBackground>
                    <StatsContainer>
                        <GraphContainer>
                            <CircularProgressbar percentage={this.calcPercentage()} initialAnimation={true} counterClockwise={true} />
                            <MoodOuterPos>
                                <MoodInnerPos>
                                    <MoodFace perc={this.calcPercentage()} />
                                </MoodInnerPos>
                            </MoodOuterPos>
                        </GraphContainer>
                        <NumberContainer>
                            {this.props.totals.base &&
                                <React.Fragment>
                                    <div style={{fontSize: '6em', fontWeight: 500 }}>
                                        {this.calcPercentage()}%
                                    </div>
                                    <div>
                                        Based on {this.props.totals.count} entries
                                    </div>
                                </React.Fragment>
                            }
                        </NumberContainer>
                    </StatsContainer>
                </StatsBackground>
                <div>
                    <EntryList>
                    {this.props.orderedHistory.map(history => (
                        <MoodEntry key={history.id} {...history}/>
                    ))}
                    </EntryList>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return getMoodInsights(state);
}

export default connect(mapStateToProps)(InsightsPage);