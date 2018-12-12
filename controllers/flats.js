const express = require('express');
const flats = express();
const models = require('../models');

// index
flats.get('/', (req, res) => {
  models.Flat.findAll().then(flats => {
    res.json(flats);
  });
});

// show by ID
flats.get('/:id', (req, res) => {
  models.Flat.findById(req.params.id).then(flat => {
    if (!flat) {
      return res.status(400).send('Nem talalhato ilyen ID!');
    }
    res.json(flat);
  });
});

// create
flats.post('/', (req, res) => {
  models.Flat.findOne({
    where: {
      title: req.body.title
    }
  }).then(preResult => {
    if (preResult) {
      return res.status(400).send('Mar letezik ilyen bizsuóra, agyááá mög másikat!');
    } else {
      models.Flat.create(req.body).then(flat => {
        res.json(flat);
      });
    }
  });
});

// update
flats.put('/:id', (req, res) => {
  models.Flat.findById(req.params.id).then(result => {
    models.Flat.findOne({ where: { model: req.body.model } }).then(result => {
      if (result) {
        return res.status(400).send('Erre nem modosithatod, mar letezik!');
      }
    });
    if (!result) {
      return res.status(400).send('Nincs ilyen FLAT, igy nem tudsz rajta valtoztatni!');
    } else {
      models.Flat.update(req.body, { where: { id: req.params.id } }).then(result => {
        res.json(result);
      });
    }
  });
});

// delete
flats.delete('/:id', (req, res) => {
  models.Flat.destroy({
    where: {
      id: req.params.id
    }
  }).then(flat => {
    if (!flat) {
      return res.status(400).send('Ellopta egy migrántóóó, igy nem létezik');
    }
    res.json(flat);
  });
});

module.exports = flats;
