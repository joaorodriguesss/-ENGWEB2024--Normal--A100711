const Contrato = require('../models/contrato');

module.exports.list = async () => {
    console.log('List method called');
    try {
        const contratos = await Contrato.find().exec();
        console.log('Contratos encontrados:', contratos);
        return contratos;
    } catch (error) {
        console.error('Error fetching contratos:', error);
        throw error;
    }
};

module.exports.findById = id => {
    return Contrato
        .findOne({ _id: id })
        .exec();
}

module.exports.listByEspecie = especie => {
    return Contrato
        .find({ especie: especie })
        .exec();
}

module.exports.listByImplant = implant => {
    return Contrato
        .find({ implant: implant })
        .exec();
}

// Método para buscar e ordenar freguesias
module.exports.listFreguesias = async () => {
    try {
        let freguesias = await Contrato.distinct('Freguesia');
        return freguesias.sort();
    } catch (error) {
        console.error("Error fetching freguesias:", error);
        throw error;
    }
}

module.exports.listEspecies = async () => {
    try {
        let especies = await Contrato.distinct('Espécie');  // Asegure-se de que 'especie' corresponda ao campo no seu modelo
        especies.sort();  // Ordena alfabeticamente
        return especies;  // Retorna a lista ordenada
    } catch (error) {
        console.error("Error fetching species:", error);
        throw error;  // Lança o erro para ser tratado na rota
    }
}

module.exports.distinctFreguesias = () => {
    return Contrato
        .distinct('freguesia')
        .exec();
}

module.exports.distinctEspecies = () => {
    return Contrato
        .distinct('especie')
        .exec();
}

module.exports.insert = contrato => {
    return Contrato.create(contrato);
}

module.exports.removeById = id => {
    return Contrato.deleteOne({ _id: id });
}

module.exports.update = (id, contrato) => {
    return Contrato.updateOne({ _id: id }, contrato);
}
  