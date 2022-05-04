module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define("Status", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
    return Status;
  };