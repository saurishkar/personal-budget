const envelopes = [];
let envelopeId = 1;

const createEnvelope = ({ name, budget }) => {
    envelopes.push({ name, budget, id: envelopeId++ });
    return envelopes[envelopes.length - 1];
}

const getAllEnvelopes = () => {
    return envelopes;
}

const getEnvelopeById = (envelopeId) => {
    const envelopeIndex = envelopes.findIndex((record) => record.id === Number(envelopeId));
    console.log(envelopeIndex);
    if(envelopeIndex === -1) {
        return;
    }
    return envelopes[envelopeIndex];
}

module.exports = {
    createEnvelope,
    getAllEnvelopes,
    getEnvelopeById
}