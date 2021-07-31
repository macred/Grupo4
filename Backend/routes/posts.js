const express = require("express");
const Post = require("../Models/post");
const User = require("../Models/user");

const router = express.Router();

const checkAuth = require("../middleware/check-auth");

router.get("", (req, res) => {
  Post.find().then((postResult) => {
    User.findById(postResult.author).then((user) => {
      postResult["authorPost"] = user;
      console.log(user);
    res.status(200).json(postResult);
  });
});
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id).then((postResult) => {
    if (postResult) {
      res.status(200).json(postResult);
    } else {
      res.status(404).json({ message: "Post no encontrado con el id enviado" });
    }
  });
});

router.post("", checkAuth, (req, res) => {
  const postForAdd = new Post({
    nombre: req.body.nombre,
    precio: req.body.precio,
    medida: req.body.medida,
    descripcion: req.body.descripcion,
    disponibilidad: req.body.disponibilidad,
    unidades: req.body.unidades,
    author: req.userData.userId,
  });
  postForAdd.save().then((createdPost) => {
    res.status(201).json({
      idPostAdded: createdPost._id,
    });
  });
});

router.delete("/:id", checkAuth, (req, res) => {
  Post.deleteOne({ _id: req.params.id, author: req.userData.userId }).then(
    (result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Post eliminado" });
      } else {
        res.status(401).json({ message: "Autenticación fallida" });
      }
    }
  );
});

router.put("/:id", checkAuth, (req, res) => {
  console.log(req.params.id);
  const post = new Post({
    _id: req.params.id,
    nombre: req.body.nombre,
    precio: req.body.precio,
    medida: req.body.medida,
    descripcion: req.body.descripcion,
    disponibilidad: req.body.disponibilidad,
    unidades: req.body.unidades,
    author: req.userData.userId
  });
  Post.updateOne({ _id: req.params.id, author: req.userData.userId }, post).then((result) => {
    console.log(result);
    if (result.nModified > 0) {
      res.status(200).json({ message: "Actualizacion ejecutada" });
    } else {
      res.status(401).json({ message: "Autenticación fallida" });
    }
  });
});

module.exports = router;