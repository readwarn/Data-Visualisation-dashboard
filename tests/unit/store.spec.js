import axios from "axios";

const UPDATE_PERSON = (state, updated_person) => {
    state.people = state.people.map(person => {
        return updated_person._id === person._id ? updated_person : person;
    })
}


const getPeopleFromServer = async({ commit }) => {
    try {
        let response = await axios.get('https://mysterious-spire-17197.herokuapp.com/people');
        commit("UPDATE_PEOPLE", response);
        return response;
    } catch (err) {
        console.log(err);
    }
}

let url = '';

jest.mock("axios", () => ({
    get: (_url) => {
        return new Promise((resolve) => {
            url = _url;
            resolve([{
                name: 'Rilwan',
                age: 23,
                _id: 'eeg/2013/089'
            }]);
        })
    }
}))


describe('vue store', () => {

    it('updates person data with the UPDATE_PERSON mutation', () => {
        const person = {
            name: 'Rilwan',
            age: 21,
            _id: 'eeg/2013/089'
        }

        const state = {
            people: [person]
        }

        let updated_person = {
            name: 'Rilwan',
            age: 23, //updated age
            _id: 'eeg/2013/089'
        }

        UPDATE_PERSON(state, updated_person);

        expect(state.people).toContain(updated_person);
    })

    it('updates people data with server response', async() => {
        let commit = jest.fn();

        let response = await getPeopleFromServer({ commit })

        expect(url).toBe('https://mysterious-spire-17197.herokuapp.com/people');

        expect(Array.isArray(response)).toBeTruthy();

        expect(commit).toHaveBeenCalledWith(
            "UPDATE_PEOPLE", response);

    })
})