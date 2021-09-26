import {
    getKeyValue,
    getPeopleData,
    getPeopleLabels,
    getPeopleDataset,
    generateLocationDataTable,
} from "../../src/services";

let test_person;;
let test_people;

beforeEach(() => {
    //test person :a single person
    test_person = {
        _id: "5d5d7ad69975c19b54ba1b73",
        age: 33,
        eyeColor: "green",
        name: "Mercado West",
        gender: "male",
        location: {
            latitude: 35.865614,
            longitude: -165.455927
        },
        preferences: {
            pet: "none",
            fruit: "banana"
        }
    }

    //test_people :array consisting of three persons
    test_people = [{
            _id: "5d5d7ad6b0e83bc2d9d67dfb",
            age: 28,
            eyeColor: "brown",
            name: "Aida Mccarty",
            gender: "female",
            location: {
                latitude: 26.723281,
                longitude: 99.391104
            },
            preferences: {
                pet: "bird",
                fruit: "apple"
            }
        },
        {
            _id: "5d5d7ad625ceac160b06721f",
            age: 25,
            eyeColor: "blue",
            name: "Padilla Blair",
            gender: "male",
            location: {
                latitude: 31.288038,
                longitude: -56.647435
            },
            preferences: {
                pet: "cat",
                fruit: "strawberry"
            }
        },
        {
            _id: "5d5d7ad69975c19b54ba1b73",
            age: 33,
            eyeColor: "green",
            name: "Mercado West",
            gender: "male",
            location: {
                latitude: 35.865614,
                longitude: -165.455927
            },
            preferences: {
                pet: "none",
                fruit: "banana"
            }
        },
    ]
})


describe('the utility functions used to generate the chart data', () => {

    it('returns the value of an object key', () => {
        // using our test_person
        let key1 = "preferences.pet";
        let key2 = "location.latitude";
        let key3 = "name";

        let value1 = "none";
        let value2 = 35.865614;
        let value3 = "Mercado West";

        //testing value of each key
        expect(getKeyValue(key1, test_person)).toBe(value1);
        expect(getKeyValue(key2, test_person)).toBe(value2);
        expect(getKeyValue(key3, test_person)).toBe(value3);
    })

    it("returns an object populated with the key:frequency pair of each unique key's value in the people data", () => {
        // testing three keys [eye, age, gender], 
        // using the test_people 

        let eye = "eyeColor";
        let age = "age";
        let gender = "gender";

        // expected data for the eye key
        let eyeObject = {
            "brown": 1,
            "blue": 1,
            "green": 1
        }

        let ageObject = {
            "33": 1,
            "28": 1,
            "25": 1
        }

        let genderObject = {
            "male": 2,
            "female": 1
        }

        expect(getPeopleData(eye, test_people)).toEqual(eyeObject);
        expect(getPeopleData(age, test_people)).toEqual(ageObject);
        expect(getPeopleData(gender, test_people)).toEqual(genderObject);
    })

    it("returns array of all keys in an object", () => {
        let genderObject = {
            "male": 2,
            "female": 1
        }
        let labels = ["male", "female"];
        expect(getPeopleLabels(genderObject)).toEqual(labels);
    })

    it("returns array of all values of each object's key", () => {
        let genderObject = {
            "male": 2,
            "female": 1
        }
        let data_set = [2, 1];

        expect(getPeopleDataset(genderObject)).toEqual(data_set);
    });

    it('generates array of location of each person in the people data', () => {
        let locations = [
            ["lat", "long", "name"],
            [26.723281, 99.391104, "Aida Mccarty"],
            [31.288038, -56.647435, "Padilla Blair"],
            [35.865614, -165.455927, "Mercado West"],
        ]

        let generated_locations = generateLocationDataTable(test_people);

        expect(generated_locations).toEqual(locations);
    })
})