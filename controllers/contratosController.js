const db = require("../config/firebase");

exports.getContratos = async (req, res) => {
  try {
    const snapshot = await db.collection("contratos").get();
    const contratos = [];
    snapshot.forEach(doc => contratos.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(contratos);
  } catch (error) {
    res.status(500).send("Error al obtener contratos: " + error.message);
  }
};

exports.getContratoById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("contratos").doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: "Contrato no encontrado" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send("Error al obtener contrato: " + error.message);
  }
};

exports.addContrato = async (req, res) => {
  try {
    const nuevo = req.body;
    const ref = await db.collection("contratos").add(nuevo);
    res.status(201).json({ id: ref.id });
  } catch (error) {
    res.status(500).send("Error al agregar contrato: " + error.message);
  }
};

exports.updateContrato = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    await db.collection("contratos").doc(id).set(datos, { merge: true });
    res.json({ mensaje: "Contrato actualizado" });
  } catch (error) {
    res.status(500).send("Error al actualizar contrato: " + error.message);
  }
};

exports.deleteContrato = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("contratos").doc(id).delete();
    res.json({ mensaje: "Contrato eliminado" });
  } catch (error) {
    res.status(500).send("Error al eliminar contrato: " + error.message);
  }
};
