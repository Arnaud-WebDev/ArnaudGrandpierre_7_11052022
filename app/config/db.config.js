const dotenv = require("dotenv").config()
// console.log(process.env.USER_MYSQL)

module.exports = {
  HOST: "localhost",
  USER: process.env.USER_MYSQL,
  PASSWORD: process.env.PASSWORD_MYSQL,
  DB: process.env.DB_MYSQL,
  dialect: "mysql",
  // pool est optionnelle mais je voulais tester
  pool: {
    // Nombre maximum de connexion dans le pool
    max: 100,
    // Nombre minimum de connexion dans le pool
    min: 0,
    // Durée maximale, en millisecondes, pendant laquelle ce pool essaiera d'obtenir une connexion avant de générer une erreur
    acquire: 30000,
    // Durée maximale, en millisecondes, pendant laquelle une connexion peut être inactive avant d'être libérée
    idle: 10000,
  },
}
