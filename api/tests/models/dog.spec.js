const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));  
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });
});
describe("Stats", () => {
  it("Arroja un error si vida no es un string", (done) => {
    Dog.create({ name: "Pug", height_min: "10" })
      .then(() => done(new Error("Vida no es un numero")))
      .catch(() => done());
  });
});
describe("Stats", () => {
  it("Arroja un error si vida no es un string", (done) => {
    Dog.create({ name: "Pug", height_max: "10" })
      .then(() => done(new Error("Vida no es un numero")))
      .catch(() => done());
  });
});
describe("Stats", () => {
  it("Arroja un error si vida no es un string", (done) => {
    Dog.create({ name: "Pug", weight_min: "10" })
      .then(() => done(new Error("Vida no es un numero")))
      .catch(() => done());
  });
});
describe("Stats", () => {
  it("Arroja un error si vida no es un string", (done) => {
    Dog.create({ name: "Pug", weight_max: "10" })
      .then(() => done(new Error("Vida no es un numero")))
      .catch(() => done());
  });
});
describe("Stats", () => {
  it("Arroja un error si vida no es un string", (done) => {
    Dog.create({ name: "Pug", life_min: "10" })
      .then(() => done(new Error("Vida no es un numero")))
      .catch(() => done());
  });
});
describe("Stats", () => {
  it("Arroja un error si vida no es un string", (done) => {
    Dog.create({ name: "Pug", life_max: "10" })
      .then(() => done(new Error("Vida no es un numero")))
      .catch(() => done());
  });
});