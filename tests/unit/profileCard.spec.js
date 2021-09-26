import { shallowMount } from '@vue/test-utils'
import profileCard from '@/components/profileCard'

// female user object
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
    _id: 'eef/2013/089'
}

const createWraper = (user) => {
    return shallowMount(profileCard, {
        propsData: { user }
    })
}

const getWrapperAvatar = (wrapper) => {
    return wrapper.find('div.avatar img').attributes().src;
}

describe('profile card component', () => {
    it('uses female avatar for female users', () => {

        const wrapper = createWraper(user);

        const avatar = getWrapperAvatar(wrapper);

        expect(avatar).toBe('../assets/avatar10.png');

    })

    it('uses male avatar for male users', () => {
        user.gender = 'male';

        const wrapper = createWraper(user);

        const avatar = getWrapperAvatar(wrapper);

        expect(avatar).toBe('../assets/avatar2.png');

    });

    it('emits edit event', async() => {
        const wrapper = createWraper(user);

        const editIcon = wrapper.find('img.edit-icon');

        await editIcon.trigger('click');

        const emittedUser = wrapper.emitted().edit[0][0]; // user emitted with the click event

        expect(emittedUser).toBe(user);

    })
})