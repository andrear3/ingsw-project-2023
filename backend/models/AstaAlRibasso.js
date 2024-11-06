import { DataTypes } from "sequelize";

export function createModel(database) {
  database.define("AstaAlRibasso", {
    prezzoMinSegreto: {
      type: DataTypes.DOUBLE(30),
      allowNull: false,
    },
    decrementoTimer: {
        type: DataTypes.INTEGER(30),
        allowNull: false,
    },
    valoreDecremento: {
        type: DataTypes.DOUBLE(30),
        allowNull: false,
    }
  });
}