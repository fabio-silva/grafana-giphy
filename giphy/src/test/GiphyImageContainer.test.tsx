import React from 'react';
import { shallow } from 'enzyme';
import { GiphyImageContainer } from '../GiphyImageContainer';

describe('GiphyImageContainer', () => {
  it('should display "No result found when getting empty array"', () => {
    const container = shallow(<GiphyImageContainer images={[]}/>);
    expect(container.html().includes('No result found')).toBe(true);
  });

  it('should display an empty node when null is passed', () => {
    const container = shallow(<GiphyImageContainer images={null}/>);
    expect(container.html().length).toBe(0);
  });

  it('should render one GiphyImage per image passed', () => {
    const images = [{
      id: '1',
      url: 'url_1'
    }, {
      id: '2',
      url: 'url_2'
    }];
    const container = shallow(<GiphyImageContainer images={images}/>);
    expect(container.children().length).toBe(2);
    expect(container).toMatchSnapshot();
  });
});
