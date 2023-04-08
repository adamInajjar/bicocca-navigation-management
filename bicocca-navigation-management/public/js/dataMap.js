let datiMappa;
/*cambia foto */
$('#piano').change(function(){ 
    var value = $(this).val();
    loadJsonDataMap(value);
    $('#map-container').empty();
        
 });

 $("#salva-btn").click(function(){
    $("#dialog-box").css("visibility", "visible");
    $(".overlay").css("visibility", "visible");
  });

  $(".btn-dialog").click(function(){
    $("#dialog-box").css("visibility", "hidden");
    $(".overlay").css("visibility", "hidden");
  });

/*click delle aree */
$('#map-container').on('click', '.cls-1', function (){
    var idAreaSelezionata = $(this).attr("id");
    var idPiano = $('#piano').val();
    $("#nome-aula").val("");
    $("#tipologia").val("");
    $("#orario-apertura").val("");
    $("#orario-chiusura").val("");
    $("#viabilita").val("");
    $("#aula-selezionata").text("Area " + idAreaSelezionata);
    $("#aula-selezionata").val(idAreaSelezionata);
    const urlVal = `http://localhost:3000/api/jsonfile/dataPiano/${idPiano}`;
    connectionAjax(urlVal).done(function(data) {
        for (let i = 0; i < data.stanze.length; i++) {
            if(data.stanze[i].id == idAreaSelezionata){
                    $("#nome-aula").val(data.stanze[i].nome);
                    $("#tipologia").val(data.stanze[i].tipologia);
                    $("#orario-apertura").val(data.stanze[i].apertura);
                    $("#orario-chiusura").val(data.stanze[i].chiusura);
                    $("#viabilita").val(data.stanze[i].viabilita);
            }
        }   
    });
});

function loadJsonDataMap(value){
    console.log("Carica MAppa");
    dataPiano(value);
    const urlVal = `http://localhost:3000/api/jsonfile/dataPiano/${value}`;
    console.log(urlVal);
    dataPiano(value, 
        function callback(data) {
            console.log(data);
            var mappaurl =  "http://localhost:3000/svg-map/"+ data.id + ".svg" ; 
            console.log(mappaurl);
            $.ajax(
                {
                    url: mappaurl,
                    dataType: 'html',
                    type: 'GET',
                    success: function(dataSvg) 
                    {         
                        datiMappa = dataSvg;
                        $("#map-container").prepend(dataSvg);
                        $("#map-container").each(function(){
                            for (let i = 0; i < data.stanze.length; i++) {
                                   $(this).find('#'+data.stanze[i].id).css('fill', data.stanze[i].colore);
                                   $("#" + data.stanze[i].id+"-text").text(data.stanze[i].id);
                                   var x = parseInt($("#"+data.stanze[i].id).attr("x"));
                                   var y = parseInt($("#"+data.stanze[i].id).attr("y"));
                                   if(isNaN(x) || isNaN(y)){
                                    var polygonStart = $("#"+data.stanze[i].id).attr('points');//.split(' ')[0];
                                    var split =String(polygonStart).split(' ');
                                    x = parseInt(split[8]);
                                    y = parseInt(split[1])+7;  
                                }
                                   var height = parseInt($("#"+data.stanze[i].id).height());
                                   $("#" + data.stanze[i].id+"-text").attr("x", x+3);
                                   $("#" + data.stanze[i].id+"-text").attr("y", y +(height/2)+1);
                                }
                        });
                    }
                });
        });
}


/* carica json del piano scelto */
function dataPiano(value, callback) {
    const urlVal = `http://localhost:3000/api/jsonfile/dataPiano/${value}`;
    console.log(urlVal);
    $.ajax({
      url: urlVal,
      dataType: 'json',
      success: function(data) {
        callback(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("errore caricamento mappa");
        console.log(textStatus, errorThrown);
        // qui puoi gestire l'errore come preferisci
      }
    });
  }


/*Salva Modifiche area */
$('#salva').on('click', function (){
    var idEdificio = $('#edificio-selezionato').val();
    var idPiano = $('#piano').val();
    var idArea = $("#aula-selezionata").val();
    var inputValueNome = $("#nome-aula").val();
    var inputValueTipologia = $("#tipologia").val();
    var inputValueApertura = $("#orario-apertura").val();
    var inputValueChiusura = $("#orario-chiusura").val();
    var inputValueViabilita = $("#viabilita").val();
    $.post("/salvaJson", {  
                            idEdificio : idEdificio,
                            idPiano : idPiano,
                            idArea : idArea,
                            nome : inputValueNome, 
                            tipologia : inputValueTipologia,
                            apertura : inputValueApertura,
                            chiusura : inputValueChiusura,
                            viabilita : inputValueViabilita,
                        }, function(response) {
    });
    loadJsonDataMap($('#piano').val()
           );
    $('#map-container').empty();
});


function connectionAjax (urlVal) {      
    return $.ajax({
            type: 'GET',
            url: urlVal,
            dataType: 'json'
    });
}


