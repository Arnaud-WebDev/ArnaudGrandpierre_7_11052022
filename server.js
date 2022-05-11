//Importe le package express
const express = require("express")

//Importe le package cors
const cors = require("cors")

const app = express()

let corsOption = {
  origin: "https://localhost:8081",
}

app.use(cors(corsOption))

//Permet d'utiliser le req.body utile pour les requêtes POST et PUT, envoie sous forme d'objet.
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
