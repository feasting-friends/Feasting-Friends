import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import toJson from 'enzyme-to-json';
import React from 'react';

import HeaderComponent from '../client/components/HeaderComponent';
import MainContainer from '../client/containers/MainContainer';
import SearchContainer from '../client/containers/SearchContainer'
import HistoryContainer from '../client/containers/HistoryContainer';
import { exportAllDeclaration } from '@babel/types';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {

    // Testing Header Component
    describe('HeaderComponent', () => {
        let wrapper;
        beforeAll(() => {
            wrapper = shallow(<HeaderComponent />);
        })

        it('It has a login button', () => {
            expect(wrapper.find('#headerComp').childAt(2).childAt(0).text()).toEqual('Login!')
        });

        it('It has a sign-up button', () => {
            expect(wrapper.find('#headerComp').childAt(3).childAt(0).text()).toEqual('Signup!')
        });

        it('It has a homepage button', () => {
            expect(wrapper.find('#headerComp').childAt(1).childAt(0).text()).toEqual('Homepage!')
        });

        it('First element to be an h1 element', () => {
            expect(wrapper.find('#headerComp').childAt(0).type()).toMatch('h1')
            expect(wrapper.find('#headerComp').childAt(0).text()).toEqual('Feasting With Friends')
        });
    })

    //Testing Main Container
    describe('Main Container', () => {
        let wrapper;
        beforeAll(() => {
            wrapper = shallow(<MainContainer />);
        })
        
        it ('Should include a search container component', () => {
            expect(wrapper.containsMatchingElement(<SearchContainer />)).toEqual(true)
        })

        it ('Should include a history container component', () => {
            expect(wrapper.containsMatchingElement(<HistoryContainer />)).toEqual(true)
        })
        
    })



})