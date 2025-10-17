const db = require("../config/firebase");

exports.getMantenimientos = async (req, res) => {
  try {
    const snapshot = await db.collection("mantenimientos").get();
    const items = [];
    snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send("Error al obtener mantenimientos: " + error.message);
  }
};

exports.getMantenimientoById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("mantenimientos").doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: "Mantenimiento no encontrado" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send("Error al obtener mantenimiento: " + error.message);
  }
};

exports.addMantenimiento = async (req, res) => {
  try {
    const nuevo = req.body;
    const ref = await db.collection("mantenimientos").add(nuevo);
    res.status(201).json({ id: ref.id });
  } catch (error) {
    res.status(500).send("Error al agregar mantenimiento: " + error.message);
  }
};

exports.updateMantenimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    await db.collection("mantenimientos").doc(id).set(datos, { merge: true });
    res.json({ mensaje: "Mantenimiento actualizado" });
  } catch (error) {
    res.status(500).send("Error al actualizar mantenimiento: " + error.message);
  }
};

exports.deleteMantenimiento = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("mantenimientos").doc(id).delete();
    res.json({ mensaje: "Mantenimiento eliminado" });
  } catch (error) {
    res.status(500).send("Error al eliminar mantenimiento: " + error.message);
  }
};
