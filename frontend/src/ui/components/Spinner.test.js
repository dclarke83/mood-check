import React from 'react';
import { shallow, mount } from 'enzyme';
import Spinner from './Spinner';

describe('Spinner', () => {
    it('should render without throwing an error', () => {
        shallow(<Spinner />);
    });

    it('should mount in a full DOM', function() {
        expect(mount(<Spinner />).find('div').length).toBe(5);
    });
});