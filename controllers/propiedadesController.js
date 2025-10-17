const db = require("../config/firebase");

exports.getPropiedades = async (req, res) => {
  try {
    const snapshot = await db.collection("propiedades").get();
    const propiedades = [];
    snapshot.forEach(doc => propiedades.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(propiedades);
  } catch (error) {
    res.status(500).send("Error al obtener propiedades: " + error.message);
  }
};

exports.getPropiedadById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("propiedades").doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: "Propiedad no encontrada" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send("Error al obtener propiedad: " + error.message);
  }
};

exports.addPropiedad = async (req, res) => {
  try {
    const nueva = req.body;
    const ref = await db.collection("propiedades").add(nueva);
    res.status(201).json({ id: ref.id });
  } catch (error) {
    res.status(500).send("Error al agregar propiedad: " + error.message);
  }
};

exports.updatePropiedad = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    await db.collection("propiedades").doc(id).set(datos, { merge: true });
    res.json({ mensaje: "Propiedad actualizada" });
  } catch (error) {
    res.status(500).send("Error al actualizar propiedad: " + error.message);
  }
};

exports.deletePropiedad = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("propiedades").doc(id).delete();
    res.json({ mensaje: "Propiedad eliminada" });
  } catch (error) {
    res.status(500).send("Error al eliminar propiedad: " + error.message);
  }
};
