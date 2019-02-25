import 'jest-styled-components';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CheckButton from './CheckButton';

describe('CheckButton', () => {
    it('should render without throwing an error', () => {
        shallow(<CheckButton />);
    });

    it('should mount in a full DOM', function() {
        expect(mount(<CheckButton />).find('input[type="checkbox"]').length).toBe(1);
    });

    it('should render to static HTML', () => {
        expect(render(<CheckButton>Test</CheckButton>).text()).toEqual('Test');
    });

    it('should execute the passed function upon clicking/checking', () => {
        const onCheckClick = jest.fn();
        const wrapper = mount(<CheckButton handleChecked={onCheckClick} />);
        wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: true }});
        expect(onCheckClick.mock.calls.length).toBe(1);
    });
    
    it('should change colour after being checked', () => {
        const onCheckClick = jest.fn();
        const wrapper = mount(<CheckButton handleChecked={onCheckClick} />);
        wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: true }});
        expect(wrapper.find('label')).toHaveStyleRule('background-color', '#81c784');
    });    
});