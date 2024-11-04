import { expect } from 'chai';
import { AstaCTRL } from "../backend/controllers/AstaCTRL.js";

describe("AstaCTRL Test1", function () { 
  it("test recuperaAstaByID 60", async function () {
   
      const result = await AstaCTRL.recuperaAstaById(60);
      console.log("Risultato:", result);
      expect(result).to.have.property('astaID', 60);
   
   
  });
});
describe("AstaCTRL Test2", function () { 
  it("test recuperaAstaById null", function () {
    AstaCTRL.recuperaAstaById(null)
     
      .catch((error) => {
        expect(error.message);
      });
  });
});

describe("AstaCTRL Test3", function () { 
  it("test recuperaAstaById 21(non presente in database)", function () {
    AstaCTRL.recuperaAstaById(21)
     
      .catch((error) => {
        expect(error.message);
      });
  });
});
describe("AstaCTRL Test4", function () { 
  it("test recuperaAstaById nussun parametro passato ", function () {
    AstaCTRL.recuperaAstaById()
     
      .catch((error) => {
        expect(error.message); 
      });
  });
});
