import React from 'react';
import styled,  { keyframes } from 'styled-components';

const cubeKeyframes = keyframes`
    0% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
`;

const Container = styled.div`
    position: relative;
    width: 200px !important;
    height: 200px !important;
    transform: translate(-100px, -100px) scale(1) translate(100px, 100px);    
`;

const Cube = styled.div`
    position: absolute;
    width: 80px;
    height: 80px;
    top: 10px;
    left: 10px;
    background: #ff5252;
    animation: ${cubeKeyframes} 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation-delay: -0.3s;

    :nth-child(2){
        top: 10px;
        left: 110px;
        background: #fdc100;
        animation-delay: -0.2s;        
    }

    :nth-child(3){
        top: 110px;
        left: 110px;
        background: #56e59d;
        animation-delay: 0s;      
    }
    
    :nth-child(4){
        top: 110px;
        left: 10px;
        background: #00a3cb;
        animation-delay: -0.1s;    
    }    
`;

const Spinner = () => {
    return (
        <Container>
            <Cube />
            <Cube />
            <Cube />
            <Cube />
        </Container>
    );
}

export default Spinner;