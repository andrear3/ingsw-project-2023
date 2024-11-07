import { expect } from 'chai';
import { AstaCTRL } from "../backend/controllers/AstaCTRL.js";
import { OffertaCTRL } from '../backend/controllers/OffertaCTRL.js';
import { Offerta } from '../backend/models/Database.js';
import { Utente } from '../backend/models/Database.js';
import { UtenteCTRL } from '../backend/controllers/UtenteCTRL.js';


import request from 'supertest';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import  {loginRouter} from '../backend/routers/LogIn.js';
import { createHash } from 'crypto';
import supertest from 'supertest';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();



describe("gestisciAstaInversa Test", function () { 
  it("test1 parametri corretti ", async function () {
       
      const result = await AstaCTRL.gestisciAstaInversa(60,38,"TestUtente");
   
      expect(result).to.be.true;
   
   
  });
});


describe("gestisciAstaInversa Test", function () { 
  it("test2 offerta maggiore", async function () {
    await AstaCTRL.gestisciAstaInversa(60,130,"TestUtente")
     
      .catch((error) => {
        expect(error.message).to.equal("L'offerta deve essere inferiore all'offerta più bassa attuale.")
      });
  });
});
describe("gestisciAstaInversa Test", function () { 
  it("test3 utente null", async function () {
     await AstaCTRL.gestisciAstaInversa(60,50,null)
     
      .catch((error) => {
        expect(error.message).to.equal("Il parametro 'venditoreNickname' non può essere null, undefined o una stringa vuota.")
      });
  });
});
describe("gestisciAstaInversa Test", function () { 
  it("test4 astaId inesistente", async function () {
     await AstaCTRL.gestisciAstaInversa(2,49,'TestUtente')
     
      .catch((error) => {
        expect(error.message).to.equal(`Asta Inversa con ID 2 non trovata.`)
      });
  });
});    

describe("creOfferta Test", function () { 
  it("test5 parametri corretti ", async function () {
       
       await OffertaCTRL.creaOfferta(103,"TestUtente",50);
   
      
      const offerta = await Offerta.findOne({ where: { valore: 103, UtenteNickname: "TestUtente" } });
      expect(offerta).to.not.be.null;
      expect(offerta.valore).to.equal(103);
      expect(offerta.UtenteNickname).to.equal("TestUtente");
  });
});
describe("creaOfferta Test", function () { 
  it("test6 astaId inesistente", async function () {
     await OffertaCTRL.creaOfferta(103,"TestUtente",3)
     
      .catch((error) => {
        expect(error.message).to.equal(`Asta  non trovata.`)
      });
  });
}); 
describe("creaOfferta Test", function () { 
  it("test7 saldo insufficiente", async function () {
     await OffertaCTRL.creaOfferta(1400,"TestUtente",50)
     
      .catch((error) => {
        expect(error.message).to.equal(`Saldo insufficiente per l'offerta.`)
      });
  });
}); 
describe("creaOfferta Test", function () { 
  it("test8 utente non trovato", async function () {
     await OffertaCTRL.creaOfferta(1400,"TestUtente102",50)
     
      .catch((error) => {
        expect(error.message).to.equal("Utente non trovato.")
      });
  });
}); 
describe("setTipoUtenete Test", function () { 
  it("test9 parametri corretti ", async function () { 
       await UtenteCTRL.setTipoUtente('compratore','TestUtente@mail.it')

      .catch((message)=>{
         expect(message).to.equal("Successo! Tipo cambiato")
      });
   
  });
  it("test10 parametro tipo incorretto ", async function () { 
     await UtenteCTRL.setTipoUtente('compratoreM','TestUtente@mail.it')

    .catch((error)=>{
       expect(error.message).to.equal("Tipo utente non valido. Deve essere 'venditore' o 'compratore'.")
    });
 
});
it("test11 paramtreo mail incorretto  ", async function () {  
   await UtenteCTRL.setTipoUtente('compratore','MAILUtente@mail.it')

  .catch((error)=>{
     expect(error.message).to.equal("Errore nel cambiare tipo")
  });

});

});


const app = express();
app.use(express.json()); 
app.use('/login', loginRouter);  

process.env.ACCESS_TOKEN_SECRET = 'token';


describe('Login API', function () {
  it('test 12 credeziali corrette ritorna access token ', async function () {
    const res = await supertest(app)

      .post('/login')
      .send({ email: 'TestUtenteHash@mail.it', password: "1234" });  
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('accessToken');
  });

  it('test 13 password non corretta error code 401', async function () {
    const res = await supertest(app)

      .post('/login')
      .send({ email: 'TestUtenteHash@mail.it', password: "wrongpassword" });
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal("Incorrect password.");
  });

  it('test 14 utente inesistente error code 401', async function () {
    const res = await supertest(app)

      .post('/login')
      .send({ email: 'TestUtenteHh@mail.it', password:"1234"});
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal("Incorrect email.");
  });
});