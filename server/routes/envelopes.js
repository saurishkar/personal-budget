const express = require('express');
const { createEnvelope, getAllEnvelopes } = require("../db");

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

module.exports = envelopeRouter;