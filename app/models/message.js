module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("message", {
    title: { type: Sequelize.STRING },

    content: { type: Sequelize.STRING },

    published: { type: Sequelize.BOOLEAN },
  })
  return Message
}
