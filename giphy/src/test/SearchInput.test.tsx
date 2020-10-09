import React from 'react';
import { shallow } from 'enzyme';
import { SearchInput } from '../SearchInput';

describe('SearchInput', () => {
  it('should have a disabled button by default', () => {
    const comp = shallow(<SearchInput onSearch={() => 0} />);
    const btn = comp.find('button');

    expect(btn.prop('disabled')).toBe(true);
  });

  it('should enable button when input is not empty', () => {
    const comp = shallow(<SearchInput onSearch={() => 0} />);
    const input = comp.find('input');
    input.simulate('change', { target: { value: 'cats' } });
    comp.update();
    const btn = comp.find('button');
    expect(btn.prop('disabled')).toBe(false);
  });

  it('should disable button when input becomes empty', () => {
    const comp = shallow(<SearchInput onSearch={() => 0} />);
    let input = comp.find('input');
    input.simulate('change', { target: { value: 'cats' } });
    comp.update();
    let btn = comp.find('button');
    input = comp.find('input');
    expect(btn.prop('disabled')).toBe(false);

    input.simulate('change', { target: { value: '' } });
    comp.update();
    btn = comp.find('button');
    expect(btn.prop('disabled')).toBe(true);
  });
});