import { DataTypes, Sequelize } from "sequelize";

export function createModel(database) {
  database.define("Offerta", {
    valore: {
      type: DataTypes.DOUBLE(30),
      allowNull: false,
      primaryKey: true,
    },
  }
}