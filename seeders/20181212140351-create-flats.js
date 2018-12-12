'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Flats', [
      {
        title: 'lakas1',
        price: 5000,
        flootArea: 1,
        country: 'Hungary',
        zip: 1,
        city: 'Szeged',
        street: 'vmi1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'lakas2',
        price: 6000,
        flootArea: 2,
        country: 'Hungary',
        zip: 2,
        city: 'Szeged',
        street: 'vmi2',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'lakas3',
        price: 7000,
        flootArea: 3,
        country: 'Hungary',
        zip: 3,
        city: 'Szeged',
        street: 'vmi3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
