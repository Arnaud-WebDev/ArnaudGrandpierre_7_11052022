//Importe le module express pour la construction de l'API Rest
const express = require("express")

//Importe le module cors : fournit un middleware Express pour activer CORS avec diverses options.
const cors = require("cors")

//Remplace body-parser()
const app = express()

let corsOption = {
  origin: "https://localhost:8081",
}

app.use(cors(corsOption))

//Permet d'utiliser le req.body utile pour les requêtes POST et PUT, envoie sous forme d'objet.
app.use(express.json())

//Il analyse les requêtes entrantes avec des charges utiles JSON et basé sur body-parser
app.use(express.urlencoded({ extended: true }))

const db = require("./app/models")
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.")
})
//{ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
//});

//Défini un route simple a tester
app.get("/", (req, res) => {
  res.json({ message: "Je suis la route a tester" })
})

//Défini le port a ecouter
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`)
})
