import React from 'react';
import { shallow, mount } from 'enzyme';
import { InsightsPage } from './InsightsPage';

describe('InsightsPage', () => {
    const dispatchMock = jest.fn();    
    const mockProps = {
        dispatch: dispatchMock,
        orderedHistory: [],
        status: 'success',
        totals: {
            base: 7,
            count: 1,
            score: 7
        }
    };

    const mockHistory = [
        {
            id: '123',
            createdAt: new Date(),
            feelings: ['happy'],
            comment: '',
            mood: 7
        }
    ];

    it('should render without throwing an error', () => {
        shallow(<InsightsPage {...mockProps} />);
    });

    it('should mount in a full DOM', () => {
        expect(mount(<InsightsPage {...mockProps} />).find('t').length).toBe(1);
    });

    it('should show MoodFaces for each entry plus the summary', () => {
        const wrapper = mount(<InsightsPage {...mockProps} orderedHistory={mockHistory} />);
        expect(wrapper.find('MoodFace').length).toBe(1 + mockHistory.length);
    });

    describe('status prop', () => {
        it('should show the spinner component if loading', () => {
            const wrapper = mount(<InsightsPage {...mockProps} status='loading' />);
            expect(wrapper.find('Spinner').length).toBe(1);
        });

        it('should show the info icon if empty', () => {
            const wrapper = mount(<InsightsPage {...mockProps} status='empty' />);
            expect(wrapper.find('FaInfoCircle').length).toBe(1);
        });

        it('should show the exclamation icon if error', () => {
            const wrapper = mount(<InsightsPage {...mockProps} status='error' />);
            expect(wrapper.find('FaExclamationTriangle').length).toBe(1);
        }); 
        
        it('should show the progress circle graph if success', () => {
            const wrapper = mount(<InsightsPage {...mockProps} status='success' />);
            expect(wrapper.find('t').length).toBe(1);
        });         
    });
});