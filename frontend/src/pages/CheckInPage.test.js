import React from 'react';
import { shallow, mount } from 'enzyme';
import { CheckInPage } from './CheckInPage';

describe('CheckinPage', () => {
    it('should render without throwing an error', () => {
        shallow(<CheckInPage />);
    });

    it('should mount in a full DOM', () => {
        expect(mount(<CheckInPage />).find('button').length).toBe(1);
    });    
});