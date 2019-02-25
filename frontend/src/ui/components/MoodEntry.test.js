import 'jest-styled-components';
import React from 'react';
import { shallow, mount } from 'enzyme';
import MoodEntry from './MoodEntry';

const mockEntry = {
    id: '123',
    createdAt: new Date(),
    feelings: ['happy'],
    comment: '',
    mood: 7
};

describe('MoodEntry', () => {
    it('should render without throwing an error', () => {
        shallow(<MoodEntry {...mockEntry} />);
    });

    it('should mount in a full DOM', () => {
        expect(mount(<MoodEntry {...mockEntry} />).find('li').length).toBe(1);
    });

    describe('expand toggle', () => {
        it('should hide feelings by default', () => {
            const wrapper = mount(<MoodEntry {...mockEntry} />);
            expect(wrapper.find('.mc-expander')).toHaveStyleRule('display', 'none');
        });

        it('should show feelings when the expand button is clicked', () => {
            const wrapper = mount(<MoodEntry {...mockEntry} />);
            wrapper.find('button').simulate('click');
            expect(wrapper.find('.mc-expander')).toHaveStyleRule('display', 'flex');
        });        
    })
});