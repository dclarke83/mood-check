import React, { Component } from 'react'
import styled from 'styled-components';

const CheckBox = styled.input.attrs(() => ({
    type: 'checkbox'
}))`
    appearance: none;
`;

const ButtonLabel = styled.label`
    border-radius: 4px;
    text-align: center;
    min-width: 64px;
    vertical-align: middle;
    padding: 6px 16px;
    cursor: pointer;
    text-transform: uppercase;
    line-height: 1.75;
    font-size: 0.875em;
    font-weight: 500;
    letter-spacing: 0.02em;
    background-color: ${props => (props.checked) ? '#81c784' : '#e0e0e0' };
    color: #000;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);

    &:hover {
        background-color: ${props => (props.checked) ? '#5a8b5c' : '#d5d5d5' }; 
    }
`;

class CheckButton extends Component {
    state = {
        checked: false
    };

    handleCheck = (e) => {
        const value = e.target.checked;
        this.setState({
            checked: value
        });
        this.props.handleChecked(this.props.name, value);
    }

    render() {
        return (
            <div style={{ display: 'inline-flex', margin: '3px' }}>
                <CheckBox 
                    name={this.props.name} 
                    id={this.props.name}
                    checked={this.state.checked} 
                    onChange={this.handleCheck}
                    />
                <ButtonLabel htmlFor={this.props.name} checked={this.state.checked}>
                    {this.props.children}
                </ButtonLabel>
            </div>
        );
    }
}

export default CheckButton;