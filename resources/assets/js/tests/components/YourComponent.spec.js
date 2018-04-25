import {shallow, mount} from 'vue-test-utils';
import http from 'http';
import sinon from 'sinon';
require('chai').should();
import YourComponent from '@/components/YourComponent';

describe('Your Component', () => {
    it('renders a vue instance', () => {
        shallow(YourComponent).isVueInstance().should.be.true;
    });

    it('has an active class by default', () => {
        shallow(YourComponent, {
            propsData: {
                isActive: true
            }
        }).classes().should.contain('active');
    });

    it('contains a list', () => {
        shallow(YourComponent).contains('ul').should.be.true;
    });

    it('has child components', () => {
        shallow(YourComponent, {
            propsData: {
                children: [1, 2, 3, 4, 5],
            },
            stubs: {
                'ChildComponent': '<li class="my-stub"></li>'
            }
        }).findAll('li.my-stub').should.have.lengthOf(5);
    });

    it('gets google.com', () => {
       sinon.spy(http, 'get');
       const wrapper = shallow(YourComponent);
       wrapper.find('button').trigger('click');
       http.get.withArgs('http://www.google.com').calledOnce.should.be.true;
    });
});