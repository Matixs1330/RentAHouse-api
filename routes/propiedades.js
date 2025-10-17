const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/propiedadesController");

router.get("/", ctrl.getPropiedades);
router.get("/:id", ctrl.getPropiedadById);
router.post("/", ctrl.addPropiedad);
router.put("/:id", ctrl.updatePropiedad);
router.delete("/:id", ctrl.deletePropiedad);

module.exports = router;
