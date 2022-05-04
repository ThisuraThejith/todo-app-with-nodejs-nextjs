module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("Todo", {
      name: {
        type: Sequelize.STRING
      }
    });
    return Todo;
  };