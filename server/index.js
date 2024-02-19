const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const envelopeRouter = require("./routes/envelopes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.port || 4001;

app.use("/api/envelopes", envelopeRouter);

app.get("/api", (req, res, next) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})