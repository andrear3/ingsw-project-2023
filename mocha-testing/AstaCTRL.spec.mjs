import { expect } from 'chai';
import { AstaCTRL } from "../backend/controllers/AstaCTRL.js";
import { database } from '../backend/models/Database.js';
describe("Test", function () {
 

  

  it("test recuperaAstaByID method", async function () {
    console.log("Chiamando recuperaAstaById con ID 12");
    
    // Verifica che l'eccezione venga lanciata quando non si trova l'asta
    const result = await AstaCTRL.recuperaAstaById(12);
    console.log("Risultato:", result); // Controlla il risultato

    // Assumendo che ID 12 esista
    //expect(result).to.not.be.null; // Verifica che il risultato non sia null
    expect(result).to.have.property('astaID', 12); // Verifica che l'oggetto risultato abbia la proprietà 'id' con valore 12
  });
});
