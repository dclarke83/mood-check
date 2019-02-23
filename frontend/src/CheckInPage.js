import React, { Component } from 'react';
import styled from 'styled-components';

import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'
import './mood-slider.scss';

import MoodFace from './MoodFace';
import CheckButton from './CheckButton';

import { connect } from 'react-redux';
import { saveMood } from './redux/actions';

const RoundButton = styled.button`
    background-color: #ff8a66;
    border-radius: 20px;
    border: 0;
    color: #fff;

    text-align: center;
    min-width: 50%;
    min-height: 40px;

    text-transform: uppercase;
    line-height: 1.75;
    font-size: 0.975em;
    font-weight: 500;
    letter-spacing: 0.06em;
    outline: none; 

    transition: all .3s;
    
    &:hover {
        background-color: orange;
    }
`;

const Comment = styled.input`
    border: 0;
    border-bottom: 1px solid #000;
    outline: none;
    width: 85%;
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

    handleFeelingChange = (name, value) => {
        this.setState(prevState => ({
            feelings: { 
                ...prevState.feelings,
                [name]: value
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

        this.props.dispatch(saveMood(moodData));
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
                    <div style={{ width: '100%', margin: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Comment type='text' value={this.state.comment} placeholder='Enter your notes (optional)' onChange={this.handleCommentChange}/>
                    </div>
                    <div style={{
                        width: '100%',
                        backgroundColor: '#edf0f5'  
                    }}>
                        <div style={{
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            flexDirection: 'row', 
                            flexGrow: 1,
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            justifyItems: 'baseline',
                            margin: '30px' }}>
                            {
                                Object.keys(this.state.feelings).map(feeling => (
                                    <CheckButton key={feeling} name={feeling} handleChecked={this.handleFeelingChange}>
                                        {feeling}
                                    </CheckButton>
                                ))
                            }
                        </div>
                    </div>
                    <div style={{ width: '100%', margin: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <RoundButton type='button' onClick={this.handleSubmit}>Save</RoundButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(CheckInPage);