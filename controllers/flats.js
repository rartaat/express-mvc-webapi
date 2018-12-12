const express = require('express'); // definiálom az expresst
const flats = express(); // meghívom az express metódusát
const models = require('../models'); // importálom a modelst

// indeyx, azaz kilistázza az összes létező tagot
flats.get('/', (req, res) => { // a flats objektum a get metódussal két bemeneti argumentumot vár, ami a request és a response
  models.Flat.findAll().then(flats => { // models obj Flat objektum findAll metódusa meghívom, ami egy promissal tér vissza. Az igaz ágában, azaz a thenbe egy flats objektum callback fgv tér vissza.
    res.json(flats); // egy JSON fáljba menti az adatokat.
  });
});

// show by ID
flats.get('/:id', (req, res) => { // flats objektum get metódusát meghívom, ami egy callback fgv-t ad vissza bemeneti paraméterként.
  models.Flat.findById(req.params.id).then(flat => { // Flat objekt findByID metódusát meghívjuk, majd ez is egy promiset ad vissza.
    if (!flat) { // itt ha az igaz ágban, azaz a thenbe egy feltétel hamis lesz, akkor hiba üzenetet fog adni.
      return res.status(400).send('Nem talalhato ilyen ID!');
    }
    res.json(flat); // ami a res objektum json formátumú metódusával tér vissza, amely megjeleníti az id alapján várt elemet
  });
});

// create
flats.post('/', (req, res) => { // flats objektum post metódusát hívom meg, aminek két bemeneti paramétere van és egy callback fgv tér vissza.
  models.Flat.findOne({ // modelsobjektum Flat propertyéje a findOne metódust hívom meg
    where: {
      title: req.body.title
    }
  }).then(result => { // szintén promissal tér vissza, amiben egy hibakezelés látható
    if (result) {
      return res.status(400).send('Mar letezik ilyen bizsuóra, agyááá mög másikat!');
    } else {
      models.Flat.create(req.body).then(flat => {
        res.json(flat);
      });
    }
  });
});

// update
flats.put('/:id', (req, res) => { // a flats nevű objektum a put metódussal két bemeneti argumentumot vár, ami a request és a response
  models.Flat.findById(req.params.id).then(result => { //  a models objectum Flats nevű objektumnak az update metódusában egy paramétert vár, mely az objektum property-je lesz
    models.Flat.findOne({ where: { model: req.body.model } }).then(result => { 
      if (result) {
        return res.status(400).send('Erre nem modosithatod, mar letezik!');
      }
    });
    if (!result) {
      return res.status(400).send('Nincs ilyen FLAT, igy nem tudsz rajta valtoztatni!');
    } else {
      models.Flat.update(req.body, { where: { id: req.params.id } }).then(result => {
        res.json(result); // a res objektum json formátumú metódusával tér vissza, amely megmutatja a módosított elemet
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
