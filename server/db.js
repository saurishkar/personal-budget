const envelopes = [];
let envelopeId = 1;

const createEnvelope = ({ name, budget }) => {
    envelopes.push({ name, budget, id: envelopeId++ });
    return envelopes[envelopes.length - 1];
}

const getAllEnvelopes = () => {
    return envelopes;
}


module.exports = {
    createEnvelope,
    getAllEnvelopes
}