const envelopes = [];
let envelopeId = 1;

const createEnvelope = ({ name, balance = 0 }) => {
    envelopes.push({ name, balance, id: envelopeId++ });
    return envelopes[envelopes.length - 1];
}

const getAllEnvelopes = () => {
    return envelopes;
}

const getEnvelopeIndexFromId = (envelopeId) => {
    return envelopes.findIndex((record) => {
        return record.id === Number(envelopeId)
    });
}

const getEnvelopeById = (envelopeId) => {
    const envelopeIndex = getEnvelopeIndexFromId(envelopeId);
    if(envelopeIndex === -1) {
        return;
    }
    return envelopes[envelopeIndex];
}

const isEnvelopeInstanceValid = (instance) => {
    if(!instance.id) {
        return false;
    }
    if(!instance.name.trim()) {
        return false;
    }
    if(!instance.balance) {
        return false;
    }
    if(isNaN(Number(instance.moneySpent))) {
        return false;
    }
    return true;
}

const updateEnvelope = (envelopeId, envelopeInstance) => {
    const envelopeIndex = getEnvelopeIndexFromId(envelopeId);
    envelopes[envelopeIndex] = envelopeInstance;
    return envelopes[envelopeIndex];
}

const deleteEnvelope = (envelopeId) => {
    const envelopeIndex = getEnvelopeIndexFromId(envelopeId);
    envelopes.splice(envelopeIndex, 1);
    return envelopes;
}

const transferBalance = (fromIndex, toIndex, balance = 0) => {
    if(envelopes[fromIndex].balance < balance) {
        throw new Error("Current balance cannot be less than transfer balance");
        return;
    }
    envelopes[fromIndex].balance -= balance;
    envelopes[toIndex].balance += balance;
    return envelopes;
}

module.exports = {
    createEnvelope,
    updateEnvelope,
    getAllEnvelopes,
    getEnvelopeById,
    getEnvelopeIndexFromId,
    deleteEnvelope,
    transferBalance
}