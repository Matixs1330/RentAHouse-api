const db = require("../config/firebase");

exports.getArrendatarios = async (req, res) => {
  try {
    const snapshot = await db.collection("arrendatarios").get();
    const arr = [];
    snapshot.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(arr);
  } catch (error) {
    res.status(500).send("Error al obtener arrendatarios: " + error.message);
  }
};

exports.getArrendatarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("arrendatarios").doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: "Arrendatario no encontrado" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send("Error al obtener arrendatario: " + error.message);
  }
};

exports.addArrendatario = async (req, res) => {
  try {
    const nuevo = req.body;
    const ref = await db.collection("arrendatarios").add(nuevo);
    res.status(201).json({ id: ref.id });
  } catch (error) {
    res.status(500).send("Error al agregar arrendatario: " + error.message);
  }
};

exports.updateArrendatario = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    await db.collection("arrendatarios").doc(id).set(datos, { merge: true });
    res.json({ mensaje: "Arrendatario actualizado" });
  } catch (error) {
    res.status(500).send("Error al actualizar arrendatario: " + error.message);
  }
};

exports.deleteArrendatario = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("arrendatarios").doc(id).delete();
    res.json({ mensaje: "Arrendatario eliminado" });
  } catch (error) {
    res.status(500).send("Error al eliminar arrendatario: " + error.message);
  }
};
