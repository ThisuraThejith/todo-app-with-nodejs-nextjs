const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Status = db.status;
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to todo application." });
});

// Routes
require('./app/routes/auth.routes')(app);
require('./app/routes/todo.routes')(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Add meta data to the Status table
function initial() {
    Status.create({
      id: 1,
      name: "To Do"
    });
   
    Status.create({
      id: 2,
      name: "In Progress"
    });
   
    Status.create({
      id: 3,
      name: "Done"
    });
  }