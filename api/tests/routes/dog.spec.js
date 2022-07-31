
/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  height_min: "10",
  height_max: "15",
  weight_min: "10",
  weight_max: "15",
  life_min: "10",
  life_max: "15"
};

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});

describe('GET /temps', () => {
  it('should get 200', () =>
    agent.get('/temps').expect(200)
  );
});

describe("GET /dogs?name=xxx", () => {
  it("Si se recibe name devolver 200", () =>
    agent.get("/dogs?name=Bond"));
});

describe("Obtiene un perro por id o name", () => {
  describe("GET /dogs/:id", () => {
    it("Se espera una respuesta 200 se si pasa un id", () =>
      agent.get("/dogs/10").expect(200));
  });

})
