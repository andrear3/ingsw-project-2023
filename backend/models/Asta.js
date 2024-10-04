import { DataTypes, Sequelize } from "sequelize";

export function createModel(database) {
  database.define("Asta", {
    astaID: {
      type: DataTypes.INTEGER(5),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nomeBeneInVendita: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    titolo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    categoria: {
      type: Sequelize.ENUM,
      values: ["informatica", "videogames", "musica", "sport", "collezionismo"],
      allowNull: false,
    },
    tipoBeneInVendita: {
      type: Sequelize.ENUM,
      values: ["articolo", "servizio"],
      allowNull: false,
    },
    descrizioneAsta: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    prezzofinale: {
      type: DataTypes.DOUBLE,
    },
    prezzoiniziale: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    dataFineAsta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    statusAsta: {
      type: Sequelize.ENUM,
      values: ["venduto", "inVendita", "nonVenduto"],
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
    },
  });
}
