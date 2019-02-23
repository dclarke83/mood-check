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
        { key: 1, value: <FaRegTired style={iconStyle} /> },
        { key: 2, value: <FaRegAngry style={iconStyle} /> },
        { key: 3, value: <FaRegFrown style={iconStyle} /> },
        { key: 4, value: <FaRegMeh style={iconStyle} /> },
        { key: 5, value: <FaRegSmile style={iconStyle} /> },
        { key: 6, value: <FaRegSmileBeam style={iconStyle} /> },
        { key: 7, value: <FaRegGrinSquint style={iconStyle} /> }
    ];

    return (
        <Container style={props.style}>
            { faces.find(face => face.key === props.mood).value }
        </Container>
    );
}

export default MoodFace;