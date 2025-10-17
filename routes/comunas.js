const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/comunasController");

router.get("/", ctrl.getComunas);
router.get("/:id", ctrl.getComunaById);
router.post("/", ctrl.addComuna);
router.put("/:id", ctrl.updateComuna);
router.delete("/:id", ctrl.deleteComuna);

module.exports = router;
