const mongoose = require("mongoose");
const { dbHOST,dbPORT } = require("../app/config");
mongoose.connect(`mongodb://${dbHOST}:${dbPORT}/admins`);
const db = mongoose.connection;
db.on("connected", () => {
    console.log("Terhubung ke basis data MongoDB");
  });
module.exports = db;
