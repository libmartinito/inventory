const express = require("express");
const router = express.Router();

// require controller modules
const item_controller = require("../controllers/itemController");
const category_controller = require("../controllers/categoryController");

// category routes

// get inventory home page
// when user gets to home page, categories are listed
router.get("/", category_controller.index);

// get request for one category
router.get("/categories/:id", category_controller.category_detail);

// item routes

// get request for one item
// router.get("/items/:id", item_controller.item_detail);

module.exports = router;
