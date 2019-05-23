import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import React from 'react';

import HeaderComponent from '../client/components/HeaderComponent';
import MainContainer from '../client/containers/MainContainer';
import LoginContainer from '../client/containers/LoginContainer';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {

    // test Header
    describe('HeaderComponent', () => {
        let wrapper;
        beforeAll(() => {
            wrapper = shallow(<HeaderComponent />);
        })

        it('It has a login button', () => {
            //expect(wrapper.find('button').children());
            console.log('we are there!!!')
            console.log(wrapper.find('button').children())
            // expect(wrapper.text()).toEqual('Mega: Markets');
            // expect(wrapper.find('strong').text()).toMatch('Mega');
        });
    })




})