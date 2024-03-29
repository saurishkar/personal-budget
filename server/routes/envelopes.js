const express = require('express');
const { createEnvelope, updateEnvelope, getAllEnvelopes, getEnvelopeById, deleteEnvelope, transferBalance, getEnvelopeIndexFromId } = require("../db");

const envelopeRouter = express();

envelopeRouter.post("/", (req, res, next) => {
    const { name = "", balance = 0 } = req.body;
    if(!name.trim() || isNaN(Number(balance))) {
        res.status(400).send("Invalid values provided");
        return;
    }
    if(balance  <= 0) {
        res.status(400).send("Balance should be a positive number");
    }
    res.status(201).send(createEnvelope({ name, balance }));
})

envelopeRouter.get("/", (req, res, next) => {
    res.send(getAllEnvelopes());
});

envelopeRouter.post("/balance-transfer", (req, res, next) => {
    const from = Number(req.body.from);
    const to = Number(req.body.to);
    const balance = Number(req.body.balance);
    const fromIndex = getEnvelopeIndexFromId(from);
    const toIndex = getEnvelopeIndexFromId(to);

    if(balance <= 0) {
        res.status(400).send("Balance should be greater than 0");
        return;
    }
    console.log(1234, from, to, typeof from, typeof to);
    if(fromIndex < 0 || toIndex < 0) {
        res.status(400).send("Envelope not found");
        return;
    }


    res.send(transferBalance(fromIndex, toIndex, balance));
})

envelopeRouter.param("envelopeId", (req, res, next, envelopeId) => {
    const envelope = getEnvelopeById(envelopeId);
    if(!envelope) {
        res.status(404).send("Envelope not found");
        return;
    }
    req.envelope = envelope;
    next();
})

envelopeRouter.get("/:envelopeId", (req, res, next) => {
    res.send(req.envelope);    
})

envelopeRouter.put("/:envelopeId", (req, res, next) => {
    const { balance, name } = req.body;
    const envelope = req.envelope;
    if(typeof balance === "number" && balance < 0) {
        res.status(400).send("Balance should be a positive number");
        return;
    }
    const instance  = {
        ...envelope,
        balance: balance || envelope.balance,
        name: name || envelope.name,
    }
    res.send(updateEnvelope(req.params.envelopeId, instance));
})

envelopeRouter.delete("/:envelopeId", (req, res, next) => {
    res.send(204).send(deleteEnvelope(req.params.envelopeId))
})

module.exports = envelopeRouter;