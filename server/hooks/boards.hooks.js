module.exports = function attachBoardsHooks(boardsSchema) {
  // only the owner can see his/her boards not of others
  //
  // TODO : add hook before (create): restrictToOwner,
  //  ADD only the owner have permission to create a new board
  //
  // TODO: add hook before (find(id)): restrictToOwner and restrictToMembers
};
