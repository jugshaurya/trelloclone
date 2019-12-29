# Trello clone

#### Thanks to Coding Gardan Cj for the project idea

- he used Featherjs and Vue to made the same

#### I am going to make it in React and backend from scratch

- will be taking the pointers about what to implement
- and using his entity relationship Diagram to make my database.

## Progress

- [x] Generate Server

  - [x] node + express
  - [x] mongodb connection + mongoose
    - [x] trello-clone db
      - [x] users collection
  - [x] auth - local SignIn using Passport
  - [x] jwt
  - [x] bcrypt to hash pass

- [x] Generate Client

  - [x] Create a react app
  - [x] use react-bootstrap/ant design or write from scratch
  - [x] Add redux-logger
  - [x] Add redux-thunk
  - [] Add redux and create basic store files

- [x] Add local auth to server
- [] TODO: Add client data validation on server
- [] Add signin and signup to client

  - [x] Create Form for Both
  - [] Add Client Side Validation of data, checking and showing errors
  - [x] save token after signin inside localstorage

- [x] Add boards service to server
- [x] User can create/view boards on client

  - [x] Create new Board
    - [x] Add ownerId
  - [x] View all the boards
    - [x] show user's boards not of others

- [] view single board using id param to route

  - [] @server : add GET /boards/id=3027593 route and route handler

* [] Add lists service to server
* [] User can create/list/view lists for boards on client
* [] Create
* [] Restrict to board owner
* [] List
* [] Restrict to board owner
* [] Add cards service to server
* [] User can create/list/view cards for lists on client
* [] Create
* [] Restrict to board owner
* [] List
* [] Restrict to board owner
* [] View
* [] Restrict to board owner
* [] User can move cards from one list to another
* [] User can add other members to a board
* [] Update restrict to board owner to include members
* [] User can re-arrange lists
* [] restrict to board members
* [] Create activities service on server
* [] All activities are logged
* [] User can assign a member to a card
* [] restrict to board members
* [] User can add comments to a card
* [] restrict to board members

### Stretch

- [] Add Socketio for real time board sharing
