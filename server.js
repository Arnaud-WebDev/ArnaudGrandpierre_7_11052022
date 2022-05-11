//Importe le package express
const express = require("express")

//Importe le package cors
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

//Défini un route simple a tester
app.get("/", (req, res) => {
  res.json({ message: "Je suis la route a tester" })
})

//Défini le port a ecouter
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`)
})
