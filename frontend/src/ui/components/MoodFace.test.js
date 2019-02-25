import 'jest-styled-components';
import React from 'react';
import { shallow, mount } from 'enzyme';
import MoodFace from './MoodFace';

describe('CheckButton', () => {
    it('should render without throwing an error', () => {
        shallow(<MoodFace />);
    });

    it('should mount in a full DOM', function() {
        expect(mount(<MoodFace mood={1} />).find('svg').length).toBe(1);
    });

    describe('mood prop', () => {
        it('should show a really unhappy face with a mood of 1', () => {
            expect(mount(<MoodFace mood={1} />).find('FaRegTired').length).toBe(1);
        });

        it('should show a really happy face with a mood of 7', () => {
            expect(mount(<MoodFace mood={7} />).find('FaRegGrinSquint').length).toBe(1);
        });        
    });

    describe('perc prop', () => {
        it('should show a really unhappy face with a perc of 1', () => {
            expect(mount(<MoodFace perc={1} />).find('FaRegTired').length).toBe(1);
        });

        it('should show a really happy face with a perc of 100', () => {
            expect(mount(<MoodFace perc={100} />).find('FaRegGrinSquint').length).toBe(1);
        });        
    });

    describe('useColourScale prop', () => {
        it('should not be grey if useColourScale is true', () => {
            const wrapper = mount(<MoodFace mood={7} useColourScale={true} />);
            expect(wrapper.find('svg').prop('style')).not.toHaveProperty('color', '#cacaca');
        });

        it('should be grey if useColourScale is false', () => {
            const wrapper = mount(<MoodFace mood={7} useColourScale={false} />);
            expect(wrapper.find('svg').prop('style')).toHaveProperty('color', '#cacaca');
        });        
    });
});