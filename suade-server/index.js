const express = require('express');
const axios = require('axios');

const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    next();
});

const fetchPeople = async() => {
    let response = [];
    try {
        response = await axios.get('https://updates.suade.org/files/people.json');
    } catch (err) {
        console.log('error', err);
    }
    return response;
}

app.get('/', (req, res) => {
    res.json({ nam: "Suade, My new home hahac" });
});

app.get('/people', async(req, res) => {
    let people = await fetchPeople();
    res.json(people.data);
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server started');
})