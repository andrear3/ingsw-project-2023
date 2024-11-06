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

/*
Funziona !! commentato poichè crea una nuova offerta ogni volta che runna 
describe("gestisciAstaInversa Test", function () { 
  it("test1 parametri corretti ", async function () {
       
      const result = await AstaCTRL.gestisciAstaInversa(60,49,"TestUtente");
   
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

describe("creOfferta Test", function () { 
  it("test1 parametri corretti ", async function () {
       
      const result = await OffertaCTRL.creaOfferta(103,"TestUtente",50);
   
      //expect(result).to.equal("Offerta salvata nel database.","Prezzo iniziale: 101, Offerta: 102");
      const offerta = await Offerta.findOne({ where: { valore: 103, UtenteNickname: "TestUtente" } });
      expect(offerta).to.not.be.null;
      expect(offerta.valore).to.equal(103);
      expect(offerta.UtenteNickname).to.equal("TestUtente");
  });
});
describe("creaOfferta Test", function () { 
  it("test2 astaId inesistente", async function () {
    const result= await OffertaCTRL.creaOfferta(103,"TestUtente",3)
     
      .catch((error) => {
        expect(error.message).to.equal(`Asta  non trovata.`)
      });
  });
}); 
describe("creaOfferta Test", function () { 
  it("test3 saldo insufficiente", async function () {
    const result= await OffertaCTRL.creaOfferta(1400,"TestUtente",50)
     
      .catch((error) => {
        expect(error.message).to.equal(`Saldo insufficiente per l'offerta.`)
      });
  });
}); 
describe("creaOfferta Test", function () { 
  it("test4 utente non trovato", async function () {
    const result= await OffertaCTRL.creaOfferta(1400,"TestUtente102",50)
     
      .catch((error) => {
        expect(error.message).to.equal("Utente non trovato.")
      });
  });
}); 
describe("setTipoUtenete Test", function () { 
  it("test1 parametri corretti ", async function () {
       
      const result = await UtenteCTRL.setTipoUtente('compratore','TestUtente@mail.it')

      .catch((message)=>{
         expect(message).to.equal("Successo! Tipo cambiato")
      });
   
  });
  it("test2 parametro tipo incorretto ", async function () {
       
    const result = await UtenteCTRL.setTipoUtente('compratoreM','TestUtente@mail.it')

    .catch((error)=>{
       expect(error.message).to.equal("Tipo utente non valido. Deve essere 'venditore' o 'compratore'.")
    });
 
});
it("test3 paramtreo mail incorretto  ", async function () {
       
  const result = await UtenteCTRL.setTipoUtente('compratore','MAILUtente@mail.it')

  .catch((error)=>{
     expect(error.message).to.equal("Errore nel cambiare tipo")
  });

});

});
*/
// Crea un'app Express per testare il loginRouter
const app = express();
app.use(express.json());  // Per gestire JSON
app.use('/login', loginRouter);  // Usa il router del login

function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}

process.env.ACCESS_TOKEN_SECRET = 'token';
/*
beforeEach(async () => {
  // Creiamo un utente di test con una password criptata
  const hashedPassword = hashPassword('1234');
  console.log("la psssss11npm",hashedPassword);

  // Elimina l'utente esistente se esiste
  await Utente.destroy({ where: { email: 'kikkowoman@mail.com' } });

  // Aggiungi un utente di test
  await Utente.create({
    nickname: 'TestUtenteHash',
    nome: 'Test',
    cognome: 'User',
    email: 'TestUtenteHash@mail.it',
    password: hashedPassword, // Usa la password criptata
    tipo: 'compratore',
    saldo: 100,
    regione: 'Lazio',
    linkEsterni: '',
    indirizzo: '',
    url: '',
    descrizione: '',
    link1: '',
    link2: '',
    link3: ''
  });
});*/

describe('Login API', function () {
  it('credeziali corrette ritorna access token ', async function () {
    // Definisci la password in chiaro
    const password ='1234';
    const hashedPassword = hashPassword(password);
     console.log("la psssss",hashedPassword);
    // Assicurati che l'utente esista nel database con la password criptata
    // Prima crea un utente nel DB con la password criptata, oppure puoi inserire direttamente nel DB un utente di test.

    const res = await supertest(app)
      .post('/login')
      .send({ email: 'TestUtenteHash@mail.it', password: "1234" });  // Usa la password criptata

    // Verifica che la risposta abbia status 200 (OK)
    expect(res.status).to.equal(200);

    // Verifica che la risposta contenga il campo 'accessToken'
    expect(res.body).to.have.property('accessToken');
  });

  it('password non corretta error code 401', async function () {
    const res = await supertest(app)
      .post('/login')
      .send({ email: 'TestUtenteHash@mail.it', password: "wrongpassword" });

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal("Incorrect password.");
  });

  it('utente inesistente error code 401', async function () {
    const password = '1234';
    const hashedPassword = hashPassword(password);
     console.log("la psssss",hashedPassword);
    // Causa un errore (ad esempio, passando una password che non può esistere nel DB)
    const res = await supertest(app)
      .post('/login')
      .send({ email: 'TestUtenteHh@mail.it', password:"1234"});

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal("Incorrect email.");
  });
});