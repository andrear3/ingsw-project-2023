import { DataTypes, Sequelize } from "sequelize";

export function createModel(database) {
  database.define("Pagamento", {
    id: {
      type: DataTypes.INTEGER(30),
      allowNull: false,
      primaryKey: true,
    },
    cifra: {
        type: DataTypes.DOUBLE(30),
        allowNull: false,
      },
  });
}