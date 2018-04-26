import {shallow, mount} from 'vue-test-utils';
import {http} from '@/services';
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

    it('disappears', () => {
       const wrapper = shallow(YourComponent);
       wrapper.contains('div.foo').should.be.true;
       wrapper.find('button').trigger('click');
       wrapper.contains('div.foo').should.be.false;
    });

    it('gets google.com and save analytics', () => {
       sinon.spy(http, 'get');
       sinon.spy(http, 'post');
       const wrapper = shallow(YourComponent);
       wrapper.find('button').trigger('click');

       http.get.withArgs('http://www.google.com').calledOnce.should.be.true;
       http.post.withArgs('http://www.analytics.com').calledOnce.should.be.true;
       http.get.restore();
       http.post.restore();
    });

    it('gets google.com', () => {
       let mock = sinon.mock(http);
       mock.expects('get').withArgs('http://www.google.com').once;
       const wrapper = shallow(YourComponent);
       wrapper.find('button').trigger('click');
       mock.verify();
       mock.restore();
    });
});