import React from 'react';
import { shallow, mount, render } from 'enzyme';
import NavBar from './NavBar';
import MemoryRouter from 'react-router/MemoryRouter';

describe('NavBar', () => {
    it('should render without throwing an error', () => {
        shallow(<NavBar />);
    });

    it('should have two hyperlinks', function() {
        expect(mount(<MemoryRouter><NavBar /></MemoryRouter>).find('a').length).toBe(2);
    });

    it('the first link should say "Check-In"', function() {
        expect(render(<MemoryRouter><NavBar /></MemoryRouter>).find('a').first().text()).toEqual('Check-In');
    });    

    it('the second link should say "Insights"', function() {
        expect(render(<MemoryRouter><NavBar /></MemoryRouter>).find('a').last().text()).toEqual('Insights');
    });        
});