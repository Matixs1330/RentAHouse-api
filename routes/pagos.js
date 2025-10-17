const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/pagosController");

router.get("/", ctrl.getPagos);
router.get("/:id", ctrl.getPagoById);
router.post("/", ctrl.addPago);
router.put("/:id", ctrl.updatePago);
router.delete("/:id", ctrl.deletePago);

module.exports = router;
