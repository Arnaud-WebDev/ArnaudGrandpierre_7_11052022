// Controleurs pour tester les autorisations

// Pour l'accès Public
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.")
}

// Pour les utilisateurs connectés
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.")
}

// Pour les utilisateurs ayant un rôle d'admin
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.")
}

// Pour les utilisateurs ayant un rôle de modérateur
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.")
}
