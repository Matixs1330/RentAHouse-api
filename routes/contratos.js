const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/contratosController");

router.get("/", ctrl.getContratos);
router.get("/:id", ctrl.getContratoById);
router.post("/", ctrl.addContrato);
router.put("/:id", ctrl.updateContrato);
router.delete("/:id", ctrl.deleteContrato);

module.exports = router;
