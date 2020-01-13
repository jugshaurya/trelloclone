# Trello clone

#### Thanks to Coding Gardan Cj for the project idea

- he used Featherjs and Vue to made the same

#### I am going to make it in React and backend from scratch

- will be taking the pointers about what to implement
- and using his entity relationship Diagram to make my database.

## UI/UX -DESIGN

- linear-gradient(135deg, #0079bf, #5067c5)
- background-color: #0079bf;
- box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

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

- [x] Add local auth to server
- [ ] TODO: Add client data validation on server
- [ ] Add signin and signup to client
  - [x] Create Form for Both
  - [ ] Add Client Side Validation of data @server, checking and showing errors: use joi
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
- [x] create/view cards in list
  - [x] @client
  - [x] @server : service to server
- [x] Drag Cards from one list to another
  - [x] Options: - https://github.com/mzabriskie/react-draggable or
        https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API or
        http://jsfiddle.net/zfnj5rv4/ or https://www.npmjs.com/package/react-draggable-list
- [x] make logged in user visible on navbar

---

- [x] user can edit the card
- [x] User can add image/attachment to a card

  - https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129
  - npm multer

- [x] Add redux and create basic store files

* [x] Create activities service on server
* [x] All activities are logged
  - [x] dragging card activity
  - [x] creating card activity
  - [x] create list activity
  - [x] card Update Activity
    - [x] card title change
    - [x] card photo change
    - [x] card descritption change

- [x] user can add description to card
- [x] Style refactor
- [] Delete Board

---

- [ ] Restrict only the board owner to
  - [ ] create a list or create a card

* [ ] User can add other members to a board
* [ ] Update restrict to board owner to include members

* [ ] User can re-arrange lists
* [ ] restrict to board members
* [ ] User can assign a member to a card
* [ ] restrict to board members

* [ ] User can add comments to a card
* [ ] restrict to board members
* [ ] Add more Functionality
  - [ ] find a list or create a card
  - [ ] update a list or create a card
  - [ ] delete a list or create a card
  - [ ] patch a list or create a card

### Stretch

- [] Add Socketio for real time board sharing
- [x] Show all the available boards on a specific board so it is easy to swithv b/w boards
- [ ] Add funtionality to boards to mark them favorites
  - [ ] show all fav boards under fav sections

### Thank you

- https://blog.logrocket.com/how-to-use-bootstrap-with-react-a354715d1121/
- https://fonts.google.com/?selection.family=PT+Sans
- https://getbootstrap.com/docs/4.4/layout/overview/
- https://vectr.com/new
- https://digitalsynopsis.com/design/beautiful-color-ui-gradients-backgrounds/
