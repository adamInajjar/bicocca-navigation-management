class ModelRoom {
    constructor(id, nome, tipologia, apertura, chiusura, viabilita, colore) {
        this.id = id;
        this.nome = nome;
        this.tipologia = tipologia;
        this.apertura = apertura;
        this.chiusura = chiusura;
        this.viabilita = viabilita;
        this.colore = colore;
    }
}

module.exports = ModelRoom;