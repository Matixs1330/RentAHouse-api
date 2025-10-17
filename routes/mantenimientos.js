const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/mantenimientosController");

router.get("/", ctrl.getMantenimientos);
router.get("/:id", ctrl.getMantenimientoById);
router.post("/", ctrl.addMantenimiento);
router.put("/:id", ctrl.updateMantenimiento);
router.delete("/:id", ctrl.deleteMantenimiento);

module.exports = router;
