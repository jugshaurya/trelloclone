### GOAL

- we need to serve the json data to front end from back-end, that is it!

- Both brings the concept of state in stateless protocol like HTTP.

- passport

  - a authetication middleware for Nodejs.
  - use to validate the incoming user, whether via jwt, or via emailandPassword, or through googleSignIn etc via their respective Strategies
  - **caveat :** - we would have written down our own middleware whihc validates those jwt, or emailandPassword and set req.user to the user after validating.

- passport-jwt
  - This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions.
