import { DataTypes, Sequelize } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
  database.define("Utente", {
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cognome: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }, //enum
    tipo: {
      type: Sequelize.ENUM,
      values: ["venditore", "compratore"],
      allowNull: false,
    },
    regione: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    linkEsterni: {
      type: DataTypes.STRING(200), //stringa concatenata
      allowNull: true,
    },
    indirizzo: {
      type: DataTypes.STRING(200), //stringa concatenata
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        let hash = createHash("sha256");
        this.setDataValue("password", hash.update(value).digest("hex"));
      },
    },
  });
}
