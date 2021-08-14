const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../Models/user");

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      direccion: req.body.direccion,
      celular: req.body.celular,
    });
    newUser
      .save()
      .then((result) => {
        res.status(201).json({ message: "Usuario creado", result: result });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  });
});

router.post("/login", (req, res) => {
  let userGet;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Autenticación fallida" });
      }
      userGet = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({ message: "Autenticación fallida" });
      }
      const token = jwt.sign(
        { email: userGet.email, userId: userGet._id },
        "MisionTic2021_secret_for_MisionBlog",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userId:userGet._id, expiresIn: 3600 });
    })
    .catch((err) => {
      return res.status(401).json({ message: "Autenticación fallida" });
    });
});

router.get("", (req, res) => {
  User.find().then((userResult) => {
    res.status(200).json(userResult);
  });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id).then((userResult) => {
    if (userResult) {
      res.status(200).json(userResult);
    } else {
      res.status(404).json({ message: "Usuario no encontrado con el id enviado" });
    }
  });

router.put("/:id", (req, res) => {
  console.log(req.body)
  const user = new User({_id: req.params.id,
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        direccion: req.body.direccion,
                        celular: req.body.celular});
            User.updateOne({_id: req.params.id}, user).then((result) => {
              res.status(200).json({message: 'Actualización ejecutada'})
            })
})
});

module.exports = router;
