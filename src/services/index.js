// this function returns the value of an object's key, useful to get value of nested keys
const getKeyValue = (key, object) => {
    let prop_key = key.split(".");
    return prop_key.reduce((obj, currentKey) => {
        return obj == undefined ? obj : obj[currentKey];
    }, object);
}

const getPeopleData = (key, people) => {
    // this returns an object which holds a value:frequency pair,
    // of each unique value of a specific person's key in the array of people

    // the functions loops through the people data and for each person in people data
    // a value:frequency pair is created (with frequency of 1) only if the value doesnt have a frequency yet
    // else, the frequency of that value is incremented by 1
    let people_data = {};

    people.forEach((person) => {

        people_data[getKeyValue(key, person)] = people_data[
                getKeyValue(key, person)
            ] ?
            people_data[getKeyValue(key, person)] + 1 :
            1;
    });
    return people_data;
}

// returns keys of an object
const getPeopleLabels = (people) => {
    return Object.keys(people);
}

//returns values of object's key
const getPeopleDataset = (people) => {
    return Object.values(people);
}


//returns array of each person location (with format [latitude,longitude,name])
const generateLocationDataTable = (people) => {
    let locations = people.map((person) => {
        return [
            person.location.latitude,
            person.location.longitude,
            person.name,
        ];
    });

    locations.splice(0, 0, ["lat", "long", "name"]);
    return locations;
}

export { getKeyValue, getPeopleData, getPeopleLabels, getPeopleDataset, generateLocationDataTable };