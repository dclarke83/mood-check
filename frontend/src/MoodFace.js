import React from 'react';
import styled from 'styled-components';
import {
    FaRegTired,
    FaRegAngry,
    FaRegFrown,
    FaRegMeh,
    FaRegSmile,
    FaRegSmileBeam,
    FaRegGrinSquint
} from 'react-icons/fa';

const Container = styled.div`
    margin: ${props => (props.style && props.style.margin) ? props.style.margin : '30px' };
    display: flex;
    justify-content: center;
`

const MoodFace = (props) => {
    const iconStyle = {
        fontSize: '10em',
        color: '#cacaca',
        ...props.style
    };
    const faces = [
        { key: 1, start: 0, stop: 14.2, value: <FaRegTired style={iconStyle} /> },
        { key: 2, start: 14.3, stop: 28.5, value: <FaRegAngry style={iconStyle} /> },
        { key: 3, start: 28.6, stop: 42.8, value: <FaRegFrown style={iconStyle} /> },
        { key: 4, start: 42.9, stop: 57.1, value: <FaRegMeh style={iconStyle} /> },
        { key: 5, start: 57.2, stop: 71.4, value: <FaRegSmile style={iconStyle} /> },
        { key: 6, start: 71.5, stop: 85.7, value: <FaRegSmileBeam style={iconStyle} /> },
        { key: 7, start: 85.8, stop: 100, value: <FaRegGrinSquint style={iconStyle} /> }
    ];

    return (
        <Container style={props.style}>
            { ((props.perc && props.perc !=='NaN') || props.mood) && faces.find(face => {
                if(props.perc) {
                    return props.perc >= face.start && props.perc <= face.stop;
                }
                return face.key === props.mood;
            }).value }
        </Container>
    );
}

export default MoodFace;