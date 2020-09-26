const express = require("express");
const router = express.Router();
const crudController = require("../controllers/crud");
const crudValidator = require("../validation/crud/crud.validation");

router.get("/", crudController.create);
router.post("/add", crudValidator.validate, crudController.add);
router.get("/edit/:id", crudController.edit);
router.get("/list", crudController.list);
router.post("/update", crudController.update);
router.get("/delete/:id", crudController.deleteUser);
// router.post("/update", crudValidator.validate, crudController.update);

module.exports = router;