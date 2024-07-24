import { DataTypes, Sequelize } from "sequelize";

export function createModel(database) {
  database.define("Offerta", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    valore: {
      type: DataTypes.DOUBLE(30),
      allowNull: false,
    },
  });
}