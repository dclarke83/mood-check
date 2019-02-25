import React from 'react';
import { shallow, mount, render } from 'enzyme';
import RoundButton from './RoundButton';

describe('RoundButton', () => {
    it('should render without throwing an error', () => {
        shallow(<RoundButton />);
    });

    it('should mount in a full DOM', () => {
        expect(mount(<RoundButton />).find('button').length).toBe(1);
    });

    it('should render to static HTML', () => {
        expect(render(<RoundButton>Test</RoundButton>).text()).toEqual('Test');
    });

    it('should execute the passed function upon clicking', () => {
        const onButtonClick = jest.fn();
        const wrapper = mount(<RoundButton handleClick={onButtonClick} />);
        wrapper.find('button').simulate('click');
        expect(onButtonClick.mock.calls.length).toBe(1);
    });
    
    describe('status prop', () => {
        it('a check icon should show if status is "success"', () => {
            expect(mount(<RoundButton status='success' />).find('FaCheck').length).toBe(1);
        });

        it('an error icon should show if status is "error"', () => {
            expect(mount(<RoundButton status='error' />).find('FaTimesCircle').length).toBe(1);
        });
        
        it('a spinner icon should show if status is "pending"', () => {
            expect(mount(<RoundButton status='pending' />).find('FaSpinner').length).toBe(1);
        });        

        it('should be disabled if status is "pending"', () => {
            expect(mount(<RoundButton status='pending' />).find('button').props()['disabled']).toBe(true);
        });                

        it('should be enabled if status is not "pending"', () => {
            expect(mount(<RoundButton status='success' />).find('button').props()['disabled']).toBe(false);
        });         
    });


});