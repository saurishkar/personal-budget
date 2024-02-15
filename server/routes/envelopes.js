const express = require('express');
const { createEnvelope, getAllEnvelopes, getEnvelopeById } = require("../db");

const envelopeRouter = express();

envelopeRouter.post("/", (req, res, next) => {
    const { name = "", budget = 0 } = req.body;
    if(!name.trim() || isNaN(Number(budget))) {
        res.status(400).send("Invalid values provided");
        return;
    }
    if(budget  <= 0) {
        res.status(400).send("Budget should be a positive number");
    }
    res.send(createEnvelope({ name, budget }));
})

envelopeRouter.get("/", (req, res, next) => {
    res.send(getAllEnvelopes());
});

envelopeRouter.get("/:envelopeId", (req, res, next) => {
    const envelope = getEnvelopeById(req.params.envelopeId);
    if(envelope) {
        res.send(envelope);
        return;
    }
    res.status(404).send("Envelope not found");
})

module.exports = envelopeRouter;