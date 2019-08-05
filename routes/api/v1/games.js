const Joi = require('@hapi/joi');
var express = require("express");
var router = express.Router();
var Game = require('../../../models').Game;
var d = new Date();
var year = d.getFullYear();

router.get("/", (req, res, next) => {
  Game.findAll()
    .then(games => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(games));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

router.get("/:id", (req, res, next) => {
  Game.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(game => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(game));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error})
  });
});

router.post("/", (req, res, next) => {
  const schema = {
    title: Joi.string().min(2).max(30).required(),
    price: Joi.number().integer(),
    releaseYear: Joi.number().integer().min(1900).max(year),
    active: Joi.string()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  Game.create({
          title: req.body.title,
          price: req.body.price,
          releaseYear: req.body.releaseYear,
          active: req.body.active
    })
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

router.put("/:id", (req, res, next) => {
  Game.update(
    {
          title: req.body.title,
          price: req.body.price,
          releaseYear: req.body.releaseYear,
          active: req.body.active
  },
  {
    returning: true,
    where: {
      id: parseInt(req.params.id)
    }
  }
)
  .then(([rowsUpdate, [updatedGame]])=> {
    res.setHeader("Content-Type", "application/json");
    res.status(202).send(JSON.stringify(updated));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error});
  });
});

router.delete("/:id", (req, res, next) => {
  Game.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(game => {
    res.setHeader("Content-Type", "application/json");
    res.status(204);
  })
  .catch(error => {
    res.setHeader("Content-Type", "applicatoin/json");
    res.status(500).send({error});
  });
});

module.exports = router;
