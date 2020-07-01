const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  console.log("req.user:", req.user);
  //const username = req.user.username;
  const clearance_level = req.user.clearance_level;
  const queryText = `SELECT * FROM "secret" WHERE $1 >= secrecy_level;`;
  pool
    .query(queryText, [clearance_level])
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making SELECT for secrets:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
