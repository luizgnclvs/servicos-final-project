import "dotenv/config";
import express from "express";
import cors from "cors";

import sequelize from "./config/db.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

await sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
	app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
});
