import { Sequelize } from "sequelize";

import { createModel as createUtenteModel } from "./Utente.js";


export const database = new Sequelize("sqlite:database", {
    dialect: "sqlite"
});

createUtenteModel(database);

export const {Utente} = database.models;

//associazioni

database.sync().then( () => {
    console.log("Database synced correctly");
  }).catch( err => {
    console.err("Error with database synchronization: " + err.message);
});