import { Sequelize } from "sequelize";

import { createModel as createUtenteModel } from "./Utente.js";
import { createModel as createAstaModel } from "./Asta.js";
import { createModel as createAstaInversaModel } from "./AstaInversa.js";
import { createModel as createAstaAlRibassoModel } from "./AstaAlRibasso.js";
import { createModel as createOffertaModel } from "./Offerta.js";

export const database = new Sequelize("sqlite:database", {
  dialect: "sqlite",
});

createUtenteModel(database);
createAstaModel(database);
createAstaInversaModel(database);
createAstaAlRibassoModel(database);
createOffertaModel(database);

export const { Utente } = database.models;
export const { Asta } = database.models;
export const { AstaInversa } = database.models;
export const { AstaAlRibasso } = database.models;
export const { Offerta } = database.models;

//Associazioni
Utente.Asta = Utente.hasMany(Asta);
Asta.Utente = Asta.belongsTo(Utente);

Utente.Offerta = Utente.hasMany(Offerta);
Offerta.Utente = Offerta.belongsTo(Utente);

Asta.Offerta = Asta.hasMany(Offerta);
Offerta.Asta = Offerta.belongsTo(Asta);

Asta.AstaAlRibasso = Asta.hasOne(AstaAlRibasso); //opzionale
AstaAlRibasso.Asta = AstaAlRibasso.belongsTo(Asta);

Asta.AstaInversa = Asta.hasOne(AstaInversa); //opzionale
AstaInversa.Asta = AstaInversa.belongsTo(Asta);

database
  .sync(/*{ force: true, alter: true }*/)
  .then(() => {
    console.log("Database synced correctly");
  })
  .catch((err) => {
    console.error("Error with database synchronization: " + err.message);
  });
