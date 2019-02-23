import React, { Component } from 'react';
import styled from 'styled-components';

import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'
import './mood-slider.scss';
import MoodFace from './MoodFace';

import { connect } from 'react-redux';
import { saveMood } from './redux/actions';

const PageTitle = styled.div`
    font-size: 30px;
    font-weight: 500;
    font-family: 'Roboto';
    border-bottom: 1px solid #000;
    margin-bottom: 5px;
`

class CheckInPage extends Component {
    state = {
        mood: 4,
        labels: {
            1: 'Bad',
            7: 'Excellent'
        },
        comment: '',
        feelings: {
            depressed: false,
            optimistic: false,
            bored: false,
            happy: false
        }
    };

    handleSlideChange = (value) => {
        this.setState({
            mood: value
        });
    }

    handleCommentChange = (e) => {
        this.setState({
            comment: e.target.value
        });
    }

    handleFeelingChange = (e) => {
        const feelingName = e.target.name;
        const feelingValue = e.target.checked;

        this.setState(prevState => ({
            feelings: { 
                ...prevState.feelings,
                [feelingName]: feelingValue
            }
        }));
    }

    handleSubmit = () => {
        const moodData = {
            mood: this.state.mood,
            feelings: Object.keys(this.state.feelings).reduce((arr, val) => {
                if(this.state.feelings[val]){
                    arr = arr.concat([val]);
                }
                return arr;
            }, []),
            comment: this.state.comment
        }

        console.log(moodData);

        this.props.dispatch(saveMood(moodData));
        console.log('Raise save action');
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <MoodFace mood={this.state.mood} />
                    <div style={{ width: '80%', marginBottom: '50px' }}>
                        <Slider 
                            value={this.state.mood}
                            min={1}
                            max={7}
                            step={1}
                            labels={this.state.labels}
                            tooltip={false}
                            orientation='horizontal'
                            className='mood-slider'
                            onChange={this.handleSlideChange}
                        />
                    </div>
                    <div style={{ width: '100%', margin: '30px' }}>
                        <label>
                            Comment
                            <input type='text' value={this.state.comment} placeholder='' onChange={this.handleCommentChange}/>
                        </label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: '30px' }}>
                        {
                            Object.keys(this.state.feelings).map(feeling => (
                                <label key={feeling}>
                                    {feeling}
                                    <input type='checkbox' checked={this.state.feelings[feeling]} name={feeling} onChange={this.handleFeelingChange} />
                                </label>
                            ))
                        }
                    </div>
                    <div>
                        <button type='button' onClick={this.handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(CheckInPage);