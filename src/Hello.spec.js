import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { shallow } from 'enzyme';
import Hello from './Hello';


describe('<Hello/>', () => {

  it('can render', () => {

    // create an element in the jsdom
    const div = document.createElement('div');

    // just make sure this renders
    ReactDOM.render(<Hello value={10} />, div);
  });

  it('can display a number', () => {

    // write out the expected html as a string and render it
    const expected = '<h1>10</h1>';
    const actual = ReactDOMServer.renderToStaticMarkup(<Hello value={10} />);

    expect(actual).toBe(expected);
  });

  // skipping this test because I don't know how to render function attributes
  it.skip('will show 0 instead of 1', () => {

    const onClick = () => 1;

    // create a shallow rendering of the <Hello /> component
    const hello = shallow(<Hello value={1} onClick={onClick} />);

    // use enzyme's shallow api to compare JSX renderings
    // this method has less useful debugging messages
    // and not sure what to do when there is a function in attributes
    expect(shallow(<Hello value={1} />).contains(<h1 onClick={onClick}>{0}</h1>)).toBe(true);

  });

  // this works because the function attribute will not be rendered
  it('will show 0 instead of 1', () => {

    const expected = '<h1>0</h1>'
    // this will not render the onclick attibute
    const actual = ReactDOMServer.renderToStaticMarkup(<Hello value={1} onClick={() => 1} />);

    expect(actual).toBe(expected);
  });

  it('will show 3 instead of 2', () => {

    // create a shallow rendering of the <Hello /> component
    const hello = shallow(<Hello value={2} />);

    // use enzyme's shallow api to get the inner text value
    expect(hello.text()).toBe('3');
  });

  it('will invoke click function onClick', () => {

    // create a jest mock function (or "spy")
    const clickFn = jest.fn();

    const hello = shallow(<Hello value={10} onClick={clickFn} />);

    // simulate a click event with enzyme's api
    hello.simulate('click');

    expect(clickFn.mock.calls.length).toBe(1);
  });

});
