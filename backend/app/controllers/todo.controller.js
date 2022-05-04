const db = require("../models");
const config = require("../config/auth.config");
const Todo = db.todo;

exports.addToDoItem = (req, res) => {
  // Save to do item of user to Database
  Todo.create({
    name: req.body.name,
    UserId: req.body.UserId,
    StatusId: req.body.StatusId
  })
  .then(todo => { 
    res.send({ item: todo, message: "To do item was added successfully!" })
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.getToDoItemList = (req, res) => {
  // Get to do item list of user
  Todo.findAll({
    where: {
      UserId: req.userId
    }
  })
  .then(todolist => { 
    res.send({ todolist: todolist })
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.updateToDoItem = (req, res) => {
  // Update to do item of user
  Todo.update({
    name: req.body.name,
    UserId: req.body.UserId,
    StatusId: req.body.StatusId
  },
  {
    where : { id: req.params.id }
  })
  .then(() => { 
    const savedItem = {
      id: req.params.id,
      name: req.body.name,
      UserId: req.body.UserId,
      StatusId: req.body.StatusId
    } 
    res.send({ item: savedItem, message: "To do item updated successfully!" })
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.deleteToDoItem = (req, res) => {
  // Delete to do item of user
  Todo.destroy(
  {
    where : { id: req.params.id }
  })
  .then(() => {  
    res.send({ message: "To do item deleted successfully!" })
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};