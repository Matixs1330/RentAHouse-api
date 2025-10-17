const db = require("../config/firebase");

exports.getComunas = async (req, res) => {
  try {
    const snapshot = await db.collection("comunas").get();
    const items = [];
    snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send("Error al obtener comunas: " + error.message);
  }
};

exports.getComunaById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("comunas").doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: "Comuna no encontrada" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send("Error al obtener comuna: " + error.message);
  }
};

exports.addComuna = async (req, res) => {
  try {
    const nuevo = req.body;
    const ref = await db.collection("comunas").add(nuevo);
    res.status(201).json({ id: ref.id });
  } catch (error) {
    res.status(500).send("Error al agregar comuna: " + error.message);
  }
};

exports.updateComuna = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    await db.collection("comunas").doc(id).set(datos, { merge: true });
    res.json({ mensaje: "Comuna actualizada" });
  } catch (error) {
    res.status(500).send("Error al actualizar comuna: " + error.message);
  }
};

exports.deleteComuna = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("comunas").doc(id).delete();
    res.json({ mensaje: "Comuna eliminada" });
  } catch (error) {
    res.status(500).send("Error al eliminar comuna: " + error.message);
  }
};
