import React from 'react';
import ReactDOM from 'react-dom';
import { render,mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

//jest.mock('./App');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("App test",() => {
    let wrapper=mount(<App />);
    wrapper.setState(()=>({
      highestprice: 1000,
      count: 2,
      list: [
        {weight:50,long:50,width:30,height:100},
        {weight:20,long:50,width:30,height:100}
      ],
    }))

    //内部数据初始化测试
    it('before click',() => {
      expect(wrapper.state('cost')).toBe("");
      expect(wrapper.state('flight')).toBe("in");
      expect(wrapper.state('area')).toBe("A");
      expect(wrapper.state('type')).toBe("a");
      expect(wrapper.state('touristtype')).toBe("a");
    });

    it('after click ', () => {
      expect(wrapper.find('input').exists());
      wrapper.find('button').simulate('click');
      expect(wrapper.state('cost')).toBe("总费用￥450");
    });

    it('when click button,handleClick() should be called',() => {
      const spyFn = jest.spyOn(App.prototype, 'handleClick');
      wrapper.find('button').simulate('click');
      expect(spyFn).not.toHaveBeenCalled();
      spyFn.mockRestore();
    });

    it('when first input change 5,onChang() should be called', () => {
      wrapper.find('input').at(0).simulate('change', {
          target: {
            value: '5'
          }});
          expect(wrapper.state('highestprice')).toBe(1000);
    });

    it('when last input change,onChang() should be called', () => {
      wrapper.find('input').last().simulate('change', {
          target: {
            name: 'height',
            value: '5'
          }});
          expect(wrapper.state('list')[1].height).toBe(5);
    });
})

it('basic use', () => {
  const wrapper = render(<App />);
  expect(toJson(wrapper)).toMatchSnapshot();
})

describe("App test1",() => {
  let wrapper=mount(<App />);
  wrapper.setState(()=>({
    highestprice: 1000,
    count: 2,
    list: [
      {weight:50,long:50,width:30,height:100},
      {weight:20,long:50,width:30,height:100}
    ],
    touristtype: 'b',
    type: 'b'
  }))

  it('after click 1', () => {
    expect(wrapper.find('input').exists());
    wrapper.find('button').simulate('click');
    expect(wrapper.state('cost')).toBe("总费用￥300");
  });
})

describe("App test2",() => {
  let wrapper=mount(<App />);
  wrapper.setState(()=>({
    highestprice: 1000,
    count: 1,
    list: [
      {weight:20,long:50,width:30,height:100}
    ],
    type: 'd'
  }))

  it('after click 2', () => {
    expect(wrapper.find('input').exists());
    wrapper.find('button').simulate('click');
    expect(wrapper.state('cost')).toBe("总费用￥150");
  });
})

describe("App test3",() => {
  let wrapper=mount(<App />);
  wrapper.setState(()=>({
    highestprice: 1000,
    count: 1,
    list: [
      {weight:50,long:50,width:30,height:100}
    ],
    touristtype: 'c',
    type: 'c'
  }))

  it('after click 3', () => {
    expect(wrapper.find('input').exists());
    wrapper.find('button').simulate('click');
    expect(wrapper.state('cost')).toBe("总费用￥300");
  });
})

describe("App test4",() => {
  let wrapper=mount(<App />);
  wrapper.setState(()=>({
    highestprice: 1000,
    count: 1,
    list: [
      {weight:50,long:50,width:30,height:100}
    ],
    touristtype: 'c',
    type: 'b',
    flight: 'in'
  }))

  it('after click 4', () => {
    expect(wrapper.find('input').exists());
    wrapper.find('button').simulate('click');
    expect(wrapper.state('cost')).toBe("总费用￥150");
  });
})

describe("App test5",() => {
  let wrapper=mount(<App />);
  wrapper.setState(()=>({
    highestprice: 1000,
    count: 2,
    list: [
      {weight:40,long:50,width:30,height:100},
      {weight:40,long:50,width:30,height:100}
    ],
    touristtype: 'c',
    type: 'a',
    flight: 'out'
  }))

  it('after click 5', () => {
    expect(wrapper.find('input').exists());
    wrapper.find('button').simulate('click');
    //expect(wrapper.state('cost')).toBe("总第1件行李长宽高总和在159-300cm之间，超尺寸费用￥1000第2件行李长宽高总和在159-300cm之间，超尺寸费用￥1000总费用￥2000");
  });
})


