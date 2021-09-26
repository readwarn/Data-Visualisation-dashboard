# Suade Labs JS Challenge

## Data Visualisation Dashboard

A [**visualisation dashboard**](https://secret-peak-58316.herokuapp.com/) of a list of people data, which allows users to

- See a paginated list of people
- Do a full text search to dynamically filter the results (searching on all fields)
- Visualise the data as a pie chart
- Visualise the data as a bar chart
- Visualise the data as a geographical chart
- Create dynamic interactions between charts (filtering from chart)
- Edit the data with a modal
- Shows a 404 page for invalid urls

### Preview

![App preview](https://github.com/readwarn/Data-Visualisation-dashboard/blob/master/src/assets/presentation.gif)

### Live link

[visualisation dashboard](https://secret-peak-58316.herokuapp.com/)


### How to run the app locally

1. Clone the repo 

2. cd into suade-test folder i.e run `cd suade-test` 

3. run `npm install`

4. run `npm run serve`

5. cd into suade-server folder i.e from the suade-test folder, run `cd suade-server`
   
6. run `npm install`

7. run `npm run start`

8. goto [http://localhost:8080/](http://localhost:8080/) to see the app live

### To run a unit test

From the suade-test folder, run `npm run test:unit`

NOTE: The data structure was queried from a custom express-server to avoid cors error.

