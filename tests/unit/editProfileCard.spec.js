import { shallowMount, createLocalVue } from '@vue/test-utils';
import editProfileCard from '@/components/editProfileCard';
import Vuex from 'vuex';

let user = {
    age: 22,
    eyeColor: 'red',
    gender: 'female',
    location: {
        latitude: 35.908,
        longitude: 45.90
    },
    name: 'Rilwan',
    preferences: {
        pet: "Cat",
        fruit: "Mango"
    },
    _id: 'eeg/2013/089'
}

describe('edit-profile card', () => {

    it('fires edit and new-toast event & commits "UPDATE_PERSON" mutation', async() => {

        const localVue = createLocalVue();

        localVue.use(Vuex);

        const commit = jest.fn();
        const busEvent = jest.fn();
        const alert = { message: "User profile updated", type: "success" };

        const store = new Vuex.Store({
            commit,
            actions: {
                updatePerson() {
                    commit("UPDATE_PERSON", user);
                }
            }
        })

        const wrapper = shallowMount(editProfileCard, {
            mocks: {
                $bus: {
                    $emit: busEvent
                }
            },
            propsData: { user },
            localVue,
            store
        });

        const saveButton = wrapper.find('button.save');
        await saveButton.trigger('click');
        const emitedEvents = wrapper.emitted();

        expect(emitedEvents.close).toBeTruthy();
        expect(commit).toBeCalledWith("UPDATE_PERSON", user);
        expect(busEvent).toBeCalledWith("new-toast", alert);
    })
})