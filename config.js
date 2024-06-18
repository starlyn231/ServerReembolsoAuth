const dotenv = require("dotenv");
dotenv.config();


const PORT = process.env.PORT || 8000;
const DB_USER = process.env.DB_USER || "sa";
const DB_PASSWORD = process.env.DB_PASSWORD || "yourStrong#Password";
const DB_SERVER = process.env.DB_SERVER || "localhost";
const DB_DATABASE = process.env.DB_DATABASE || "webstore";

console.log(PORT)
module.exports = { PORT, DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE };
