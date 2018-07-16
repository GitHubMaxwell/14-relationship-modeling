![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 14: Mongo/Express 2 Resource API
===

* TRAVIS BADGE: [![Build Status](https://travis-ci.com/GitHubMaxwell/14-relationship-modeling.svg?branch=max-lab14)](https://travis-ci.com/GitHubMaxwell/14-relationship-modeling)

## Links

* TRAVIS:  https://travis-ci.com/GitHubMaxwell/14-relationship-modeling 
* HEROKU: https://lab14-max.herokuapp.com/ 
* GitHUB PR: https://github.com/GitHubMaxwell/14-relationship-modeling/pull/2

## Steps
* fork/clone code
* npm install
* run npm test without having Nodemon (npm start) running but has MongoDB running with mongod in terminal


## env fields

* PORT
* MONGODB_URI

## Heroku/Postman Testing

* GET: fail 404, it should respond with 'not found' for valid requests made with an id that was not found
-- `https://lab14-max.herokuapp.com/api/v1/cats/`

* GET: success 200, it should contain a response body for a request made with a valid id
-- do a POST first and copy the _id and paste it at the end of the uri like below
-- `https://lab14-max.herokuapp.com/api/v1/cats/18f3dde0-8895-11e8-9c87-adca78fc36b5`

* POST: fail 400, it should respond with 'bad request' if no request body was provided or the body was invalid
-- `https://lab14-max.herokuapp.com/api/v1/cats`
-- (in body tab > raw / JSON(application/json))    `{"name":"max","color":"green"}`

* POST: pass 200, it should respond with the body content for a post request with a valid body
-- `https://lab14-max.herokuapp.com/api/v1/cats`
-- dont put anything in the body tag

* DELETE-one pass 200
-- do a POST first and copy the _id and paste it at the end of the uri like below
-- `https://lab14-max.herokuapp.com/api/v1/cats/18f3dde0-8895-11e8-9c87-adca78fc36b5`

* DELETE-one fail 404
-- `https://lab14-max.herokuapp.com/api/v1/cats`

* DELETE-all pass 200
-- `https://lab14-max.herokuapp.com/api/v1/deleteall/cats`

* PUT pass 200
-- do a POST first and copy the _id and paste it at the end of the uri like below
-- `https://lab14-max.herokuapp.com/api/v1/cats/18f3dde0-8895-11e8-9c87-adca78fc36b5`

* PUT fail 400
-- `https://lab14-max.herokuapp.com/api/v1/cats`