const db = require("../models")
const config = require("../config/auth.config")
const User = db.user
const Role = db.role
const Op = db.Sequelize.Op
let jwt = require("jsonwebtoken")
let bcrypt = require("bcryptjs")

exports.signup = (req, res) => {
  // Sauvegarder l'utilisateur dans la base de données
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "L'utilisateur a été enregistrée avec succès !" })
          })
        })
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "L'utilisateur a été enregistrée avec succès !" })
        })
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "L'utilisateur n'a pas été trouvé" })
      }
      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe invalide",
        })
      }
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: "24h",
      })
      let authorities = []
      useInflection.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE" + roles[i].name.toUpperCase())
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        })
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}
