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
- [ ] TODO: Add client data validation on server
- [ ] Add signin and signup to client

  - [x] Create Form for Both
  - [ ] Add Client Side Validation of data, checking and showing errors
  - [x] save token after signin inside localstorage

- [x] Add boards service to server
- [x] User can create/view boards on client

  - [x] Create new Board
    - [x] Add ownerId
  - [x] View all the boards
    - [x] show user's boards not of others

- [x] view single board using id param to route

  - [x] @server : add GET /boards/id=3027593 route and route handler

- [ ] User can create/view lists for boards

  - [x] @server
    - [x] create new list in board, POST : /lists/:boardId
    - [x] get all , GET: /lists/:boardId
  - [x] @client : create board Component
    - [x] get all lists in a board
    - [x] create new list
  - [ ] Restrict only the owner to create a new list

---

- [x] create/view cards in list

  - [x] @client
  - [x] @server : service to server

- [ ] Drag Cards from one list to another
  - [ ] User can move cards from one list to another
- [ ] make logged in user visible on navbar

- [ ] Restrict only the board owner to :
  - [] create a list or create a card

---

- [ ] User can add other members to a board
- [ ] Update restrict to board owner to include members
- [ ] User can re-arrange lists
- [ ] restrict to board members
- [ ] Create activities service on server
- [ ] All activities are logged
- [ ] User can assign a member to a card
- [ ] restrict to board members
- [ ] User can add comments to a card
- [ ] restrict to board members
- [ ] Add more Functionality
  - [ ] find a list or create a card
  - [ ] update a list or create a card
  - [ ] delete a list or create a card
  - [ ] patch a list or create a card

### Stretch

- [] Add Socketio for real time board sharing
