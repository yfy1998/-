import React from 'react';
import { shallow,render } from 'enzyme';
import Luggage from './Luggage'
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const props = {
    // Jest 提供的mock 函数
    LugChange: jest.fn( (e) => {
    }),
    item: {}
}

it('when input change,onChang() should be called', () => {
    const wrapper=shallow(<Luggage {...props}/>);
    wrapper.find('input').at(0).simulate('change', {
        target: {
          value: '5'
        }});
     expect(props.LugChange).toBeCalled();
  });

  it('when input change a,onChang() should be called', () => {
    const wrapper=shallow(<Luggage {...props}/>);
    wrapper.find('input').at(0).simulate('change', {
        target: {
          value: 'a'
        }});
     expect(props.LugChange).toBeCalled();
  });

  it('snapshot2', () => {
    const wrapper = render(<Luggage {...props}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  })
  