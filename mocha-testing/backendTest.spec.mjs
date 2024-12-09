import { expect } from 'chai';
import { OffertaCTRL } from '../backend/controllers/OffertaCTRL.js';
import { UtenteCTRL } from '../backend/controllers/UtenteCTRL.js';
import  {loginRouter} from '../backend/routers/LogIn.js';
import supertest from 'supertest';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();



describe("creaOffertaInversa Test", function () {
  it("test1 parametri corretti", async function () {
    const result = await OffertaCTRL.creaOffertaInversa(32, "TestUtente", 60);
    expect(result).to.equal("Offerta salvata nel database."); 
  });

  it("test2 offerta maggiore", async function () {
    const result = await OffertaCTRL.creaOffertaInversa(60, "TestUtente", 60);
    expect(result).to.equal("Offerta troppo alta."); 
  });

  it("test3 utente null", async function () {
    const result = await OffertaCTRL.creaOffertaInversa(50, null, 60);
    expect(result).to.equal("Utente non trovato.");
  });

  it("test4 astaId inesistente", async function () {
    const result = await OffertaCTRL.creaOffertaInversa(49, 'TestUtente', 2);
    expect(result).to.equal("Asta non trovata.");
  });
  it("test5 offerta negativa", async function () {
    const result = await OffertaCTRL.creaOffertaInversa(-10, 'TestUtente', 60);
    expect(result).to.equal("Offerta non valida.");
  });
});

describe('creaOfferta Test', function() {
  it('test6 crea offerta con successo ', async function() {
    const result = await OffertaCTRL.creaOfferta(103, 'TestUtente', 50);
    expect(result).to.equal('Offerta salvata nel database');
  });

  it('test7 id asta inesistente', async function() {
    const result = await OffertaCTRL.creaOfferta(103, 'TestUtente', 3);
    expect(result).to.equal('Asta non trovata.');
  });

  it('test8 saldo non sufficiente per coprire offerta', async function() {
    const result = await OffertaCTRL.creaOfferta(1400, 'TestUtente', 50);
    expect(result).to.equal('Saldo insufficiente per l\'offerta');
  });

  it('test9 utente inesistente', async function() {
    const result = await OffertaCTRL.creaOfferta(1400, 'TestUtente102', 50);
    expect(result).to.equal('Utente non trovato');
  });

  it('test10 offerta minore ', async function() {
    const result = await OffertaCTRL.creaOfferta(49, 'TestUtente', 50);
    expect(result).to.equal('Offerta troppo bassa');
  });
  it('test11 offerta negativa', async function() {
    const result = await OffertaCTRL.creaOfferta(-10, 'TestUtente', 50);
    expect(result).to.equal('Offerta troppo bassa');
  });
});



describe('setTipoUtente Test', function () {
  it('test12 cambia il tipo utente con successo "', async function () {
    const result = await UtenteCTRL.setTipoUtente('compratore', 'TestUtente@mail.it');
   
    expect(result).to.be.equal("Succeso! Tipo cambiato");
  });

  it('test13 ritorna errore Tipo utente non valido', async function () {
    await UtenteCTRL.setTipoUtente('admin', 'TestUtente@mail.it')
      .catch((error) => {
        expect(error.message).to.equal("Tipo utente non valido. Deve essere 'venditore' o 'compratore'.");
      });
  });

  it('test14 errore Utente non trovato', async function () {
    await UtenteCTRL.setTipoUtente('compratore', 'nonEsistente@mail.it')
      .catch((error) => {
        expect(error.message).to.equal("Errore nel cambiare tipo, Utente non trovato");
      });
  });

  it('test15 campo Email vuoto', async function () {
    await UtenteCTRL.setTipoUtente('compratore', '')
      .catch((error) => {
        expect(error.message).to.match(/email/i);
      });
  });

});

const app = express();
app.use(express.json()); 
app.use('/login', loginRouter);  

process.env.ACCESS_TOKEN_SECRET = 'token';


describe('Login', function () {
  it('test 16 credeziali corrette  ', async function () {
    const res = await supertest(app)

      .post('/login')
      .send({ email: 'TestUtenteHash@mail.it', password: "1234" });  
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('accessToken');
  });

  it('test 17 password non corretta ', async function () {
    const res = await supertest(app)

      .post('/login')
      .send({ email: 'TestUtenteHash@mail.it', password: "wrongpassword" });
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal("Incorrect password.");
  });

  it('test 18 utente inesistente', async function () {
    const res = await supertest(app)

      .post('/login')
      .send({ email: 'TestUtenteHh@mail.it', password:"1234"});
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal("Incorrect email.");
  });
});
