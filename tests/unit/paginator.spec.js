import { shallowMount, createLocalVue } from '@vue/test-utils'
import paginator from '@/components/paginator'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter);

const routes = [{
    name: "People",
    path: "/people/:page",
    component: paginator
}]

const router = new VueRouter({ routes });

const pageNumber = 10;

let wrapper;

describe('paginator component', () => {

    beforeEach(async() => {

        wrapper = shallowMount(paginator, {
            localVue,
            router,
            propsData: { pageNumber }
        });
    })

    it('expects accurate page ratio to be shown', async() => {
        await router.push("/people/1");

        const pageRatio = wrapper.find('div.page-ratio p');

        expect(pageRatio.text()).toBe('Page 1/10');
    });

    it('expects route page param to increase by 1', async() => {
        await router.push("/people/3");

        const rightCaret = wrapper.find('.page-control .right-caret');

        await rightCaret.trigger('click');

        const pageRatio = wrapper.find('div.page-ratio p');

        expect(pageRatio.text()).toBe('Page 4/10');

    })

})