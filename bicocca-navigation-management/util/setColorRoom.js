class SetColorRoom {
    constructor(tipologia) {
        this.tipologia = tipologia;
    }
    
    getColor() {
         let color;
         switch (this.tipologia) {
            case "Aula":
                color = "#3C92DE";
              break;
            case "Bagni":
                color = "#3CDE72";
              break;
            case "Corridoio":
                color = "#DED23C";
              break;
            case "Biblioteca":
                color = "#523CDE";
              break;
            case "Area studio":
                color = "#3CDEB7";
              break;
            case "Segreteria":
                color = "#F344D0";
                break;
            default:
                color = "#C8C8C8";
          }
          return color;
    }
   
}
module.exports = SetColorRoom;