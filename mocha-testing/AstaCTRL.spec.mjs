import { expect } from 'chai';
import { AstaCTRL } from "../backend/controllers/AstaCTRL.js";
import { database } from '../backend/models/Database.js';
import { Asta } from '../backend/models/Database.js';
describe("Test", function () { 
  it("test recuperaAstaByID method", async function () {
    try {
      const result = await AstaCTRL.recuperaAstaById(60);
      console.log("Risultato:", result);
      expect(result).to.not.be.null;
      expect(result).to.have.property('astaID', 60);
    } catch (error) {
      console.error("Errore:", error);
    }
  });


});
