import React from 'react';
import { shallow } from 'enzyme';
import { GiphyImageContainer } from '../GiphyImageContainer';

describe('GiphyImageContainer', () => {
  it('should display "No result found when getting empty array"', () => {
    const container = shallow(<GiphyImageContainer images={[]}/>);
    expect(container.html().includes('No result found')).toBe(true);
  });
});
