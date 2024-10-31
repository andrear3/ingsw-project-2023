import { expect } from 'chai';
import { AstaCTRL } from "../backend/controllers/AstaCTRL.js";
import { database } from '../backend/models/Database.js';
import { Asta } from '../backend/models/Database.js';
describe("Test1", function () { 
  it("test recuperaAstaByID method", async function () {
   
      const result = await AstaCTRL.recuperaAstaById(60);
      console.log("Risultato:", result);
      expect(result).to.have.property('astaID', 60);
   
   
  });
});
describe("AstaCTRL - recuperaAstaById", function () { 
  it("should throw an error for invalid ID (null)", function (done) {
    AstaCTRL.recuperaAstaById(null)
     
      .catch((error) => {
        //verfica che il risultato atteso sia quello aspettato ( un messaggio di errore)
        expect(error.message).to.equal("Asta with ID null not found");
        done(); 
      });
  });
});

  


