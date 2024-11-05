import { expect } from 'chai';
import { AstaCTRL } from "../backend/controllers/AstaCTRL.js";



describe("gestisciAstaInversa Test", function () { 
  it("test1 parametri corretti ", async function () {
       
      const result = await AstaCTRL.gestisciAstaInversa(60,79,"TestUtente");
   
      expect(result).to.be.true;
   
   
  });
});
describe("gestisciAstaInversa Test", function () { 
  it("test2 offerta maggiore", async function () {
    const result= await AstaCTRL.gestisciAstaInversa(60,130,"TestUtente")
     
      .catch((error) => {
        expect(error.message).to.equal("L'offerta deve essere inferiore all'offerta più bassa attuale.")
      });
  });
});
describe("gestisciAstaInversa Test", function () { 
  it("test3 utente null", async function () {
    const result= await AstaCTRL.gestisciAstaInversa(60,50,null)
     
      .catch((error) => {
        expect(error.message).to.equal("Il parametro 'venditoreNickname' non può essere null, undefined o una stringa vuota.")
      });
  });
});
describe("gestisciAstaInversa Test", function () { 
  it("test4 astaId inesistente", async function () {
    const result= await AstaCTRL.gestisciAstaInversa(2,49,'TestUtente')
     
      .catch((error) => {
        expect(error.message).to.equal(`Asta Inversa con ID 2 non trovata.`)
      });
  });
});