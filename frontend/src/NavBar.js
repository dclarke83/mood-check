import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

//#region Styles
const NavContainer = styled.div`
    height: 56px;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding-left: 10px;
    padding-right: 10px;    
`;

const NavContent = styled.div`
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #eee;
    
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: stretch;
    align-content: center; 
`;

const StyledNavLink = styled(NavLink)`
    height: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #ccc;
    font-weight: 500;

    &:hover {
        background-color: #f5f5f5;
        transition: all .8s;
    }
`;

const activeStyle = {
    color: '#000',
    borderBottom: '2px solid #000'
};
//#endregion

const NavBar = () => {
    return (
        <NavContainer>
            <NavContent>
                <StyledNavLink activeStyle={activeStyle} exact to='/checkin'>Check-In</StyledNavLink>
                <StyledNavLink activeStyle={activeStyle} exact to='/insights'>Insights</StyledNavLink>
            </NavContent>
        </NavContainer>
    );
}

export default NavBar;