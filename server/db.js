const envelopes = [];


const createEnvelope = ({ name, budget }) => {
    envelopes.push({ name, budget });
    return envelopes[envelopes.length - 1];
}

const getAllEnvelopes = () => {
    return envelopes;
}

module.exports = {
    createEnvelope,
    getAllEnvelopes
}