import React from 'react'
import styled from 'styled-components';
import { FaSpinner, FaCheck, FaTimesCircle } from 'react-icons/fa';
import './font-awesome-animation.min.css';

const StyledButton = styled.button`
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
    cursor: pointer;
    
    &:hover {
        background-color: orange;
    }

    &:disabled {
        cursor: auto;
        background-color: orange;
    }
`;

const OuterPos = styled.div`
    position: relative;
`;

const InnerPos = styled.div`
    position: absolute;
    right: 4px;
    margin-top: -25px;
`;

const StatusIcon = (props) => {
    switch(props.status){
        case 'pending': {
            return <FaSpinner className='faa-spin animated' />
        }
        case 'success': {
            return <FaCheck />
        }
        case 'error': {
            return <FaTimesCircle/>
        }
        default: {
            return <React.Fragment />;
        }
    }
}

const RoundButton = (props) => {
    return (
        <StyledButton onClick={props.handleClick} disabled={(props.status === 'pending')}>
            {props.children}
            <OuterPos>
                <InnerPos>
                    <StatusIcon status={props.status} />
                </InnerPos>
            </OuterPos>
        </StyledButton>
    );
}

export default RoundButton;