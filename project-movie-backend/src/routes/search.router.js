const express = require("express");
const searchController = require('../controllers/search.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');

const router = express.Router();

router
    .route("/")
    .get(searchController.searchByTitle)
    .all(methodNotAllowed);

module.exports = router;



