const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/arrendatariosController");

router.get("/", ctrl.getArrendatarios);
router.get("/:id", ctrl.getArrendatarioById);
router.post("/", ctrl.addArrendatario);
router.put("/:id", ctrl.updateArrendatario);
router.delete("/:id", ctrl.deleteArrendatario);

module.exports = router;
