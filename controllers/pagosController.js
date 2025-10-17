const db = require("../config/firebase");

exports.getPagos = async (req, res) => {
  try {
    const snapshot = await db.collection("pagos").get();
    const pagos = [];
    snapshot.forEach(doc => pagos.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(pagos);
  } catch (error) {
    res.status(500).send("Error al obtener pagos: " + error.message);
  }
};

exports.getPagoById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("pagos").doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: "Pago no encontrado" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send("Error al obtener pago: " + error.message);
  }
};

exports.addPago = async (req, res) => {
  try {
    const nuevo = req.body;
    const ref = await db.collection("pagos").add(nuevo);
    res.status(201).json({ id: ref.id });
  } catch (error) {
    res.status(500).send("Error al agregar pago: " + error.message);
  }
};

exports.updatePago = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    await db.collection("pagos").doc(id).set(datos, { merge: true });
    res.json({ mensaje: "Pago actualizado" });
  } catch (error) {
    res.status(500).send("Error al actualizar pago: " + error.message);
  }
};

exports.deletePago = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("pagos").doc(id).delete();
    res.json({ mensaje: "Pago eliminado" });
  } catch (error) {
    res.status(500).send("Error al eliminar pago: " + error.message);
  }
};
