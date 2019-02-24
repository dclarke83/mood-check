import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'
import './mood-slider.scss';
import MoodFace from './MoodFace';
import CheckButton from './CheckButton';
import RoundButton from './RoundButton';
import { connect } from 'react-redux';
import { saveMood } from './redux/actions';
import { getSaveStatus } from './redux/selectors';

//#region styled-components
// const RoundButton = styled.button`
//     background-color: #ff8a66;
//     border-radius: 20px;
//     border: 0;
//     color: #fff;
//     text-align: center;
//     min-width: 50%;
//     min-height: 40px;
//     text-transform: uppercase;
//     line-height: 1.75;
//     font-size: 0.975em;
//     font-weight: 500;
//     letter-spacing: 0.06em;
//     outline: none; 
//     transition: all .3s;
    
//     &:hover {
//         background-color: orange;
//     }
// `;

const Comment = styled.input`
    border: 0;
    border-bottom: 1px solid #000;
    outline: none;
    width: 85%;
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SliderContainer = styled.div`
    width: 80%;
    margin-bottom: 50px;
`;

const GeneralContainer = styled.div`
    width: 100%;
    margin: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FeelingsBackground = styled.div`
    width: 100%;
    background-color: #edf0f5;
`;

const FeelingsContainer = styled.div`
    display: flex; 
    flex-wrap: wrap;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;
    align-items: center;
    justify-items: baseline;
    margin: 30px;
`;
//#endregion

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
                <PageContainer>
                    <MoodFace mood={this.state.mood} />
                    <SliderContainer>
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
                    </SliderContainer>
                    <GeneralContainer>
                        <Comment 
                            type='text' 
                            value={this.state.comment} 
                            placeholder='Enter your notes (optional)' 
                            onChange={this.handleCommentChange}
                        />
                    </GeneralContainer>
                    <FeelingsBackground>
                        <FeelingsContainer>
                            {
                                Object.keys(this.state.feelings).map(feeling => (
                                    <CheckButton key={feeling} name={feeling} handleChecked={this.handleFeelingChange}>
                                        {feeling}
                                    </CheckButton>
                                ))
                            }
                        </FeelingsContainer>
                    </FeelingsBackground>
                    <GeneralContainer>
                        <RoundButton type='button' handleClick={this.handleSubmit} status={this.props.status}>Save</RoundButton>
                    </GeneralContainer>
                </PageContainer>
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    getSaveStatus(state)
);

export default connect(mapStateToProps)(CheckInPage);