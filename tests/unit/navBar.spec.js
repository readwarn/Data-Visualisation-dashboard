import { shallowMount, createLocalVue } from "@vue/test-utils";
import navBar from '@/components/navBar';
import People from '@/views/People';
import Chart from '@/views/Chart';
import Vuex from 'vuex';
import VueRouter from 'vue-router'

describe("Nav bar", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);

    let store;
    let router;

    const getChartType = jest.fn();
    const commit = jest.fn();

    const routes = [{
            name: "People",
            path: "/people/:page",
            component: People

        },
        {
            name: "Chart",
            path: "/chart",
            component: Chart
        }
    ]

    const createWrapper = (chart) => {
        return shallowMount(navBar, {
            propsData: {
                chart: chart
            },
            store,
            router,
            localVue
        })
    }

    const chartVisibily = (show_chart) => {
        const wrapper = createWrapper(show_chart);
        const chart_nav_link = wrapper.find('select#chart');
        return chart_nav_link.exists();
    }

    beforeEach(() => {
        router = new VueRouter({ routes });
        store = new Vuex.Store({
            commit,
            actions: {
                updateChartType(chart_type) {
                    commit("UPDATE_CHART_TYPE", chart_type)
                }
            },
            getters: {
                getChartType
            }
        })
    })

    it('shows charts nav-link if chart prop true', () => {
        expect(chartVisibily(true)).toBe(true);
    })

    it('hides charts nav-link if chart prop false', () => {
        expect(chartVisibily(false)).toBe(false);
    })

    it('changes the chart-type to be rendered', async() => {
        const wrapper = createWrapper(true);
        const select_chart_type = wrapper.find('select.chart-type');

        await select_chart_type.trigger('change');

        expect(commit).toBeCalled();
    })


})